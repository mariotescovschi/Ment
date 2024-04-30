const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.updatePollsAvailability = functions.pubsub.schedule('00 00 * * *').timeZone('Europe/Bucharest').onRun(async (context) => {
    const pollsDocRef = admin.firestore().collection('polls').doc('availability');

    try {
        const pollsDoc = await pollsDocRef.get();

        if (pollsDoc.exists) {
            // Update the value of poll1 to true
            await pollsDocRef.update({
                poll1: false,
                poll2: false,
                poll3: false
            });
            console.log('Polls availability updated');
        } else {
            console.log('Polls document does not exist');
        }
    } catch (error) {
        console.error('Error updating polls availability:', error);
    }
});

exports.updatePoll1Availability = functions.pubsub.schedule('00 09 * * *').timeZone('Europe/Bucharest').onRun(async (context) => {
    const pollsDocRef = admin.firestore().collection('polls').doc('availability');

    try {
        // Check if poll1 is available
        const pollsDoc = await pollsDocRef.get();

        if (pollsDoc.exists) {
            await pollsDocRef.update({ poll1: true });
            console.log('Poll1 availability updated');
        } else {
            console.log('Poll1 document does not exist');
        }
    } catch (error) {
        console.error('Error updating poll1 availability:', error);
    }
});

exports.updatePoll2Availability = functions.pubsub.schedule('00 13 * * *').timeZone('Europe/Bucharest').onRun(async (context) => {
    const pollsDocRef = admin.firestore().collection('polls').doc('availability');

    try {
        // Check if poll1 is available
        const pollsDoc = await pollsDocRef.get();

        if (pollsDoc.exists) {
            await pollsDocRef.update({ poll2: true });
            console.log('Poll2 availability updated');
        } else {
            console.log('Poll2 document does not exist');
        }
    } catch (error) {
        console.error('Error updating poll2 availability:', error);
    }
});

exports.updatePoll3Availability = functions.pubsub.schedule('00 17 * * *').timeZone('Europe/Bucharest').onRun(async (context) => {
    const pollsDocRef = admin.firestore().collection('polls').doc('availability');

    try {
        const pollsDoc = await pollsDocRef.get();

        if (pollsDoc.exists) {
            await pollsDocRef.update({ poll3: true });
            console.log('Poll3 availability updated');
        } else {
            console.log('Poll3 document does not exist');
        }
    } catch (error) {
        console.error('Error updating poll3 availability:', error);
    }
});