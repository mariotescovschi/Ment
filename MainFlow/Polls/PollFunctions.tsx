import {doc, getDoc, updateDoc} from "firebase/firestore";
import {FIRESTORE_DB} from "../../FireBaseConfig";
import {Ment} from "./PollContext";

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

const updatePollsDone = async (index: number, currentUser: string): Promise<any | null> => {
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

            return data;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error updating document: ", error);
        return null;
    }
};

//update in users/pollsDone[index] current date when poll done
export const PollsDone = async (index: number, currentUser: string, answers: Ment[]) => {
    try {
        const userData = await updatePollsDone(index, currentUser);
        const docRef = doc(FIRESTORE_DB, 'groups', userData.country, userData.zone, userData.school, userData.grade, 'ments');

        const newDate = new Date();
        const batchName = currentUser + '\\' + newDate.toISOString();

        await updateDoc(docRef,
            {
                [batchName]:{
                    Ments: answers,
                    date: new Date()
                }
            });


    } catch (error) {
        console.error("Error completing poll:", error);
    }
};

