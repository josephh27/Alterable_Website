import { getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { firestoreDb } from "./main.js";

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

export const setupUI = (user) => {
    if (user) { 
        getDoc(doc(firestoreDb, 'users', user.uid)).then(doc => {
            //Account info
            const html = `
            <div>Logged in as ${user.email}</div>
            <div>${doc.data().bio}</div>
            `;
            accountDetails.innerHTML = html;
        })
        
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // Hide account info
        accountDetails.innerHTML = '';
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}



// Setup materialize components
document.addEventListener('DOMContentLoaded', () => {
    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    let items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
})

const guideInputIds = ['coeIntro'];
// Setup guides
const guideList = document.querySelector('.guides');
export const setupGuides = (user, data) => {
    if (data.length && user) {
        let html = '';
        let i = 0;
        data.forEach((doc) => {
            const guide = doc.data();
            const li = `
                <li>
                    <div class="collapsible-header grey lighten-4">College of Engineering</div>
                    <div class="collapsible-body white"><textarea id="${guideInputIds[i]}">${guide.coeIntroContent}</textarea></div>
                <li>
            `;
            i += 1
            html += li;
        });
        const submitButton = `<input type="submit" value="Submit">`
        html += submitButton
        guideList.innerHTML = html;
    } else if (!data.length && user){
        guideList.innerHTML = '<h5 class="center">No data stored yet.</h5>';
    } else {
        guideList.innerHTML = '<h5 class="center">Please login to view guides.</h5>';
    }
}

// Create new guide
const guidesForm = document.querySelector('#guides-form');
guidesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    setDoc(doc(firestoreDb, "guides", "College of Engineering"), {
        coeIntroContent: guidesForm['coeIntro'].value
      }).then(() => {
        console.log('success');
      }).catch(err => {
        console.log(err.message);
    });

})

