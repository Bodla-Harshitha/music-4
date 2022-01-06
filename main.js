song1="";
song2="";

leftHandWristX="";
leftHandWristY="";

rightHandWristX="";
rightHandWristY="";

scorerightwrist="";
scoreleftwrist="";

statusSong1="";
statusSong2="";

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("Model has loaded!")
}

function gotPoses(result){
    if(result.length > 0){

        console.log(result);

        scoreleftwrist=result[0].pose.keypoints[9].score;
        console.log('score of left hand wrist ='+scoreleftwrist);

        scorerightwrist=result[0].pose.keypoints[9].score;
        console.log('score of right hand wrist ='+scorerightwrist);

        leftHandWristX=result[0].pose.leftWrist.x;
    leftHandWristY=result[0].pose.leftWrist.y;
    console.log("leftHandWristX="+leftHandWristX);
    console.log("leftHandWristY="+leftHandWristY);

    rightHandWristX=result[0].pose.rightWrist.x;
    rightHandWristY=result[0].pose.rightWrist.y;
    console.log("rightHandWristX="+rightHandWristX);
    console.log("rightHandWristY="+rightHandWristY);
    }
}

function draw(){
    image(video,0,0,600,500);

    fill('#454B1B');
    stroke('#454B1B');

    statusSong1=song1.isPlaying();
    statusSong2=song2.isPlaying();

    if(scoreleftwrist>0.2){
        circle(leftHandWristX,leftHandWristY,20);
        song2.stop();
        if(statusSong1==false){
            song1.play();
            document.getElementById("song").innerHTML="Song = Harry Potter Theme song"
        }
    }

    if(scorerightwrist>0.2){
        circle(rightHandWristX,rightHandWristY,20);
        song1.stop();
        if(statusSong2==false){
            song2.play();
        document.getElementById("song").innerHTML="Song = Peter pan"
        }
    }
    
}

function start(){
    song1.play();
    
}