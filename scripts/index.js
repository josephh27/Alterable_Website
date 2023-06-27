import { collection, getDocs, onSnapshot, doc} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { firestoreDb } from "../admin_scripts/main.js";


const guideContentIds = ['coeIntroContent'];

const fillContent = () => {
    onSnapshot(collection(firestoreDb, 'guides'), (snapshot) => {
        const data = snapshot.docs;
        data.forEach((doc) => {
            guideContentIds.forEach((id) => {
                const guide = doc.data();
                const element = document.querySelector(`#${id}`);
                element.textContent = guide[id];
            })
            
    });
    }, err => {
        console.log(err.message);
    });

}

fillContent()
