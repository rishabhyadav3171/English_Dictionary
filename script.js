let inputEle = document.getElementById('input');
let textInfo = document.getElementById('text-info');
let meaningContainer = document.getElementById("meaning-container")
let titleEl = document.getElementById("title");
let meaningEl = document.getElementById("meaning");
let audioEl = document.getElementById("audio")

inputEle.addEventListener("mouseenter",()=>{
    inputEle.style.transform = "scale(1.4)"
    
    inputEle.style.transition = "all 0.5s"
})
inputEle.addEventListener("mouseout",()=>{
    inputEle.style.transform = "scale(1)"
})


     async function myfunc(f){
        textInfo.style.display = "block";
        meaningContainer.style.display = "none";
     textInfo.innerHTML = `Searching for meaning of ${f}....`
        try {
            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${f}`;
            const result = await fetch(url).then((res)=>res.json() )
            if(result.title){
                titleEl.innerText = f;
                meaningEl.innerText  = "N/A";
                audioEl.style.display = "none";
            }
            textInfo.style.display = 'none';
            meaningContainer.style.display = "block";
            titleEl.innerHTML = result[0].word;
            titleEl.style.color = "yellow"

            meaningEl.innerHTML = result[0].meanings[0].definitions[0].definition;
            meaningEl.style.color = "green";
            audioEl.src = result[0].phonetics[0].audio;
            

               console.log(result)
            
        } catch (error) {
            console.log(`Internet Error : ${error}`)
        }
}


inputEle.addEventListener("keyup",(e)=>{
    if(e.target.value && e.key  === "Enter"){
       myfunc(e.target.value)
    }
})