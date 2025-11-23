document.addEventListener('DOMContentLoaded',function(){
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");


    //return True or False based on regex
    function validateUsername(username){
        if(username.trim()===""){
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9](?:[a-zA-Z0-9_-]{1,14}[a-zA-Z0-9])$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }


    async function fetchUserDetails(username){
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            searchButton.textContent="Searching...";
            searchButton.disabled = true;

            const response = await fetch(url);
            if(!response.ok){
                throw new Error("unable to fetch the User details");
            }
            const parsedata = await response.json();
            console.log("Logging Data : ", parsedata);

            displayUserData(parsedata);

        }
        catch(error){
            console.error("Caught Error: ", error);
            statsContainer.innerHTML = '<p>No data Found</p>'
        }
        finally{
            searchButton.textContent= "search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle){
        const ProgressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${ProgressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(parsedata){
        const {
        totalQuestions,
        totalSolved,
        easySolved,
        mediumSolved,
        hardSolved,
        totalEasy,
        totalMedium,
        totalHard,
        
        } = parsedata;


        updateProgress(easySolved, totalEasy, easyLabel, easyProgressCircle);
        updateProgress(mediumSolved, totalMedium, mediumLabel, mediumProgressCircle);
        updateProgress(hardSolved, totalHard, hardLabel, hardProgressCircle);

        // console.log(`Total Questions: ${totalQuestions}`);
        // console.log(`Solved: ${totalSolved}`);
        // console.log(`Easy: ${easySolved} / ${totalEasy}`);
        // console.log(`Medium: ${mediumSolved} / ${totalMedium}`);
        // console.log(`Hard: ${hardSolved} / ${totalHard}`);

        // const cardData = [
        //     {label:"Overall Submission", value: totalQuestions}, {label:"Overall Easy Submission", value: totalEasy}, {label:"Overall Medium Submission", value: totalMedium},{label:"Overall Hard Submission", value: totalHard}
        // ];
        // console.log ("cards are: ", cardData);

        // Create HTML for the stats cards
    const cardsHTML = `
        <div class="stat-card">
            <h3>Total Solved</h3>
            <p>${totalSolved} / ${totalQuestions}</p>
        </div>
        <div class="stat-card">
            <h3>Easy Solved</h3>
            <p>${easySolved} / ${totalEasy}</p>
        </div>
        <div class="stat-card">
            <h3>Medium Solved</h3>
            <p>${mediumSolved} / ${totalMedium}</p>
        </div>
        <div class="stat-card">
            <h3>Hard Solved</h3>
            <p>${hardSolved} / ${totalHard}</p>
        </div>
    `;

    // Inject it into the page
    cardStatsContainer.innerHTML = cardsHTML;


}

    
    searchButton.addEventListener('click', ()=>{
        const username = usernameInput.value;
        console.log("Logging Username: ", username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })


});



