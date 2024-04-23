import {doc, getDoc, updateDoc} from "firebase/firestore";
import {FIRESTORE_DB} from "../../FireBaseConfig";

export const timeUntilNextPoll = (): { hours: number, minutes: number } => {
    const pollTimes = [
        {id: 1, time: '09:00'},
        {id: 2, time: '13:00'},
        {id: 3, time: '17:00'}
    ];

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();  // Current time in minutes since midnight
    let minDiff = Infinity;
    let nextPollTime = { hours: 0, minutes: 0 };

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

//update in users/pollsDone[index] current date when poll done
export const PollDone = async (index: number, currentUser: string) => {
    const docRef = doc(FIRESTORE_DB, "users", currentUser);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    await getDoc(docRef).then(
        (doc) => {
            if (doc.exists()) {
                let updatedData = doc.data().pollsDone;
                updatedData[index] = currentDate;
                updateDoc(docRef, {pollsDone: updatedData});
            }
            else
                console.log("No such document!");
        }
    );
}