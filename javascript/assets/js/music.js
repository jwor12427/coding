const allMusic = [
    {
        name : "1. Mokokong Island",
        artist : "Smilegate RPG - Lost Ark",
        img : "music_bg01",
        audio : "music_ad01"
    },
    {
        name : "2. Enchanted Museum",
        artist : "Smilegate RPG - Lost Ark",
        img : "music_bg02",
        audio : "music_ad02"
    },
    {
        name : "3. Mucura Forest",
        artist : "Smilegate RPG - Lost Ark",
        img : "music_bg03",
        audio : "music_ad03"
    },
    {
        name : "4. 귀여운 브이로그",
        artist : "NATONI",
        img : "music_bg04",
        audio : "music_ad04"
    },
    {
        name : "5. 피아노 BGM",
        artist : "NATONI",
        img : "music_bg05",
        audio : "music_ad05"
    },
    {
        name : "6. Splendid Circus",
        artist : "Smilegate RPG - Lost Ark",
        img : "music_bg06",
        audio : "music_ad06"
    },
    {
        name : "7. 평화로운 피아노",
        artist : "LeonMusic",
        img : "music_bg07",
        audio : "music_ad07"
    },
    {
        name : "8. 꿈꾸는 추억의 섬 - 기묘한 박물관",
        artist : "Smilegate RPG - Lost Ark",
        img : "music_bg08",
        audio : "music_ad08"
    },
    {
        name : "9. Run Mokokos",
        artist : "Smilegate RPG - Lost Ark",
        img : "music_bg09",
        audio : "music_ad09"
    },
    {
        name : "10. BabaYaba The Wicked",
        artist : "Smilegate RPG - Lost Ark",
        img : "music_bg10",
        audio : "music_ad10"
    },
]

//서택자
const musicWrap = document.querySelector(".music__wrap");
const musicView = musicWrap.querySelector(".music__view .img img");
const musicName = musicWrap.querySelector(".music__view .title h3");
const musicArtist = musicWrap.querySelector(".music__view .title p");
const musicAudio = musicWrap.querySelector("#main-audio");
const musicPlay = musicWrap.querySelector("#control-play");
const musicPrevbtn = musicWrap.querySelector("#control-prev");
const musicNextBtn = musicWrap.querySelector("#control-next");
const musicProgress = musicWrap.querySelector(".progress");
const musicProgressBar = musicWrap.querySelector(".progress .bar");
const musicProgressCurrent = musicWrap.querySelector(".progress .timer .current");
const musicProgressDuration = musicWrap.querySelector(".progress .timer .duration");
const musicRepeat = musicWrap.querySelector("#control-repeat");
const musicListBtn = musicWrap.querySelector("#control-list");
const musicList = musicWrap.querySelector(".music__list");
const musicListUl = musicWrap.querySelector(".music__list ul");

let musicIndex = 1;

//음악 재생
function loadMusic(num){
    musicName.innerText = allMusic[num-1].name;
    musicArtist.innerText = allMusic[num-1].artist;
    musicView.src = `../assets/img/`+allMusic[num-1].img+`.png`;
    musicAudio.src = `../assets/audio/`+allMusic[num-1].audio+`.mp3`;
}

//재생 버튼
function playMusic(){
    musicWrap.classList.add("paused");
    musicPlay.setAttribute("title", "정지");
    musicPlay.setAttribute("class", "stop");
    musicAudio.play();
}

//정지 버튼
function pauseMusic(){
    musicWrap.classList.remove("paused");
    musicPlay.setAttribute("title", "재생");
    musicPlay.setAttribute("class", "play");
    musicAudio.pause();
}

//이전곡 듣기 버튼
function prevMusic(){
    musicIndex == 1 ? musicIndex = allMusic.length : musicIndex--;
    loadMusic(musicIndex);
    playMusic();
}

//다음곡 듣기 버튼
function nextMusic(){
    musicIndex == allMusic.length ? musicIndex = 1 : musicIndex++;
    loadMusic(musicIndex);
    playMusic();
}

//뮤직 진행바
musicAudio.addEventListener("timeupdate", e => {
    // console.log(e);

    const currentTime = e.target.currentTime;         //오디오의 현재 재생 시간
    const duration = e.target.duration;               //오디오의 총 길이
    let progressWidth = (currentTime/duration) * 100; //전체 길이에서 현재 진행되느 시간을 백분위로 나눔

    musicProgressBar.style.width = `${progressWidth}%`;

    //전체시간
    musicAudio.addEventListener("loadeddata", () => {
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);      //전체 시간을 분단위로 쪼갬
        let totalSec = Math.floor(audioDuration % 60);      //남은 초를 저장
        if(totalSec < 10) totalSec = `0${totalSec}`;        //초가 한자리 수 일때 앞에 0을 붙임
        musicProgressDuration.innerText = `${totalMin}:${totalSec}`;        //완성된 시간 문자열 출력
    })

    //진행시간
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10) currentSec = `0${currentSec}`;
    musicProgressCurrent.innerText = `${currentMin}:${currentSec}`;

});

//진행 버튼 클릭
musicProgress.addEventListener("click", (e) => {
    let progressWidth = musicProgress.clientWidth;  //진행바 전체 길이
    let clickedOffsetX = e.offsetX;             //진행바 기준으로 측정되는 X좌표
    let songDuration = musicAudio.duration;     //오디오 전체 길이

    musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration; //백분위로 나눈 숫자에 다시 전체 길이를 곱해서 현재 음악의 길이를 구함
});

//반복 버튼 클릭
musicRepeat.addEventListener("click", () => {
    let getAtter = musicRepeat.getAttribute("class");

    switch(getAtter){
        case "repeat" :
            musicRepeat.setAttribute("class", "repeat_one");
            musicRepeat.setAttribute("title", "한곡 반복");
        break;
        case "repeat_one" :
            musicRepeat.setAttribute("class", "shuffle");
            musicRepeat.setAttribute("title", "랜덤 반복");
        break;
        case "shuffle" :
            musicRepeat.setAttribute("class", "repeat");
            musicRepeat.setAttribute("title", "전체 재생");
        break;
    }
})

//오디오가 끝나면
musicAudio.addEventListener("ended", () => {
    let getAtter = musicRepeat.getAttribute("class");

    switch(getAtter) {
        case "repeat" : 
            nextMusic();
        break;
        case "repeat_one" :
            playMusic();
        break;
        case "shuffle" :
            let randomIndex = Math.floor(Math.random() * allMusic.length + 1);  //랜덤 인텍스 생성
            
            do {
                randomIndex = Math.floor(Math.random() * allMusic.length + 1);
            } while (musicIndex == randomIndex)
            musicIndex = randomIndex;           //현재 인덱스를 랜덤 인덱스로 변경
            loadMusic(musicIndex);              //랜덤 인덱스가 반영된 현재 인덱스 값으로 음악을 다시 로드
            playMusic();                        //로드한 음악을 재생
        break;
    };
});

//뮤직 리스트 버튼 클릭
musicListBtn.addEventListener("click", () => {
    musicList.classList.add("show");
});

//뮤직 리스트 구현하기
for(let i=0; i<allMusic.length; i++){
    let li = `
    <li>
        <strong>${allMusic[i].name}</strong>
        <em>${allMusic[i].artist}</em>
        <span></span>
    </li>`;

    musicListUl.innerHTML += li;
}


//플레이 버튼
musicPlay.addEventListener("click", () => {
    const isMusicPauesd = musicWrap.classList.contains("paused");   //음악이 재생 중
    isMusicPauesd ? pauseMusic() : playMusic();
});

//이전곡 다음곡 버튼
musicPrevbtn.addEventListener("click", () => {
    prevMusic();
});
musicNextBtn.addEventListener("click", () => {
    nextMusic();
});



//음악 재생
window.addEventListener("load", () => {
    loadMusic(musicIndex);
})