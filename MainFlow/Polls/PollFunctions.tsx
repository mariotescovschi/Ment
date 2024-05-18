import {doc, getDoc, updateDoc} from "firebase/firestore";
import {FIREBASE_AUTH, FIRESTORE_DB} from "../../FireBaseConfig";
import {Ment, questionType} from "./PollContext";
import {writeBatch} from "firebase/firestore";
import React from "react";

export const startPoll = async (setQuestions: React.Dispatch<React.SetStateAction<questionType[]>>) => {
    const user = FIREBASE_AUTH.currentUser;
    const token = await user.getIdToken();

    await fetch("https://europe-central2-ment-12376.cloudfunctions.net/getPoll", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json()).then(data => {
            const formattedData: questionType[] = data.map(item => ({
                question: item.question,
                options: item.users.map(option => ({
                    userName: option.userName,
                    userPhoto: option.userPhoto,
                    userUID: option.userUID
                }))
            }));
            setQuestions(formattedData);
        });
}

export const timeUntilNextPoll = (): { hours: number, minutes: number } => {
    const pollTimes = [
        {id: 1, time: '09:00'},
        {id: 2, time: '13:00'},
        {id: 3, time: '17:00'}
    ];

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();  // Current time in minutes since midnight
    let minDiff = Infinity;
    let nextPollTime = {hours: 0, minutes: 0};

    pollTimes.forEach(poll => {
        const [hours, minutes] = poll.time.split(':').map(Number);
        const pollTimeInMinutes = hours * 60 + minutes;
        let diff = pollTimeInMinutes - currentTime;

        if (diff < 0)
            diff += 1440;

        if (diff < minDiff) {
            minDiff = diff;
            nextPollTime = {
                hours: Math.floor(diff / 60),
                minutes: diff % 60
            };
        }
    });

    return nextPollTime;
};

const updatePollsDone = async (index: number, currentUser: string) => {
    try {
        const docRef = doc(FIRESTORE_DB, "users", currentUser);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const document = await getDoc(docRef);

        if (document.exists()) {
            const data = document.data();
            const updatedData = data.pollsDone ? [...data.pollsDone] : [];
            updatedData[index] = currentDate;
            await updateDoc(docRef, {pollsDone: updatedData});

        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export const PollsDone = async (index: number, currentUser: string, answers: Ment[]) => {
    try {

        await updatePollsDone(index, currentUser);

        // Generate a batch instance
        const batch = writeBatch(FIRESTORE_DB);

        // Get the document reference
        const docRef = doc(FIRESTORE_DB, 'users', currentUser, 'ments', 'sent');

        // Create the base for the batch name
        const newDate = new Date();
        const timestamp = newDate.toISOString().split('.')[0];

        // Prepare the data for the update
        const answersArray = answers.map((answer) => ({
            question: answer.question,
            options: answer.options,
            from: currentUser,
            to: answer.to,
            timestamp: timestamp
        }));

        const updateData = {
            [timestamp]: answersArray
        };

        // Add the update to the batch
        batch.update(docRef, updateData);

        // Commit the batch
        await batch.commit();

        await fetch("https://europe-central2-ment-12376.cloudfunctions.net/updateReceivedMents", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userUid: currentUser, timestamp: timestamp })
        });

    } catch (error) {
        console.error("Error completing poll:", error);
    }
};