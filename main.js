rightWrist_x=0;
rightWist_y=0;
leftWrist_x=0;
leftWrist_y=0;
leftWrist_score=0;
song_1=" ";
song_2=" ";
rightWrist_score=" ";
song1_status=" ";
song2.status=" ";
function preload(){
    song_1=loadSound("harry_potter.mp3");
    song_2=loadSound("peter_pan.mp3");
}
function setup() {
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on("pose",gotResults);

    video.hide();
}
function modelLoaded(){
    console.log("success")
}

function gotResults(results){

    if (results.length>0){
        console.log(results);
  leftWrist_x=results[0].pose.leftWrist.x;
  leftWrist_y=results[0].pose.leftWrist.y; 

  rightWrist_x=results[0].pose.rightWrist.x;
  rightWrist_y=results[0].pose.rightWrist.y;
  leftWrist_score=results[0].pose.keypoints[9].score;
  rightWrist_score=results[0].pose.keypoints[10].score;

console.log(leftWrist_score);
    }
}  
function draw(){
    song1_status = song_1.isPlaying();
    song2_status=song_2.isPlaying();
    image(video,0,0,400,400);

    fill("red");
 stroke("black");

if(leftWrist_score>0.2){
    circle(leftWrist_x,leftWrist_y,40);
    song_2.stop();

    if (song1_status==false){
        song_1.play();
        document.getElementById("song_name").innerHTML="Harry Potter Theme Song";
        
    }
}

if(rightWrist_score>0.2){
    circle(rightWrist_x,rightWrist_y,40);
    song_1.stop();

    if (song2_status==false){
        song_2.play();
        document.getElementById("song_name").innerHTML="Petter Pan Theme Song";
        
    }
}
}