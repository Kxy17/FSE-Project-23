
<script>
  import P5 from "p5-svelte";
  const sketch = (p5) => {
    let status = -1;
    let message = "";
    let c;

    p5.setup = () => {
      p5.createCanvas(450, 400);

      p5.background("pink");
    };

    p5.draw = () => {
      // Reset background
      if (p5.mouseX > 178 && p5.mouseX < 278 && p5.mouseY > 375 && p5.mouseY < 405) {
        p5.background("pink");
      }

      p5.noStroke();

      // Starting area
      p5.textSize(20);
      p5.fill("skyblue");
      p5.rect(165, 380, 70, 20);
      p5.fill(0);
      p5.text("Start", 178, 375, 100, 30);

      // Ending area
      p5.fill("lightgreen");
      p5.rect(30, 0, 40, 30);
      p5.fill(0);
      p5.textSize(13);
      p5.text("end", 39, 20);

      p5.fill(0);

      // Big Walls
      p5.rect(155, 250, 10, 150); // V
      p5.rect(235, 300, 10, 100); // V
      p5.rect(235, 300, 200, 10); // H
      p5.rect(155, 250, 250, 10); // H
      p5.rect(400, 160, 10, 100); // V
      p5.rect(430, 140, 10, 170); // V
      p5.rect(320, 135, 120, 10); // H
      p5.rect(320, 160, 90, 10); // H

      p5.ellipse(250, 160, 85);
      p5.ellipse(165, 100, 90);
      p5.ellipse(150, 200, 97);

      p5.rect(30, 160, 100, 10); // H
      p5.rect(30, 0, 10, 160); // V
      p5.rect(60, 0, 10, 130); // V
      p5.rect(60, 130, 85, 10); // H

      // Start playing

      if (p5.mouseX > 178 && p5.mouseX < 278 && p5.mouseY > 375 && p5.mouseY < 405) {
        status = 1;
        message = "";
      }
      if (status == 1) {
        p5.strokeWeight(3);
        p5.stroke("skyblue");
        p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
      }

      // win case
      if (
        status == 1 &&
        p5.mouseX > 30 &&
        p5.mouseX < 450 &&
        p5.mouseY > 0 &&
        p5.mouseY < 30
      ) {
        c = "green";
        p5.noStroke();
        message = "Congrats, You Win!";
      }

      // lose cases

      // outside canvas
      if (p5.mouseX > p5.width || p5.mouseX < 0 || p5.mouseY > p5.height || p5.mouseY < 2) {
        status = 0;
        message = "Try again";
        c = "red";
      }
      if (p5.mouseX == 0 && p5.mouseY == 0) status = -1;

      // p5.rect(155,250,10, 150);    // V
      // p5.rect(155,250,10, 150);    // V
      if (p5.mouseX > 155 && p5.mouseX < 165 && p5.mouseY > 250 && p5.mouseY < 400) {
        status = 0;
        message = "Try again";
        c = "red";
      }

      // p5.rect(235,300,10, 100);    // V
      // p5.rect(235,300,10, 100);    // V
      if (p5.mouseX > 235 && p5.mouseX < 245 && p5.mouseY > 300 && p5.mouseY < 400) {
        status = 0;
        message = "Try again";
        c = "red";
      }

      // p5.rect(235,300, 200, 10);   // H
      // p5.rect(235,300, 200, 10);   // H
      if (p5.mouseX > 235 && p5.mouseX < 435 && p5.mouseY > 300 && p5.mouseY < 310) {
        status = 0;
        message = "Try again";
        c = "red";
      }

      // p5.rect(155,250, 250, 10);   // H
      if (p5.mouseX > 155 && p5.mouseX < 405 && p5.mouseY > 250 && p5.mouseY < 260) {
        status = 0;
        message = "Try again";
        c = "red";
      }

      // p5.rect(400,160,10, 100);    // V
      // p5.rect(400,160,10, 100);    // V
      if (p5.mouseX > 400 && p5.mouseX < 410 && p5.mouseY > 160 && p5.mouseY < 260) {
        status = 0;
        message = "Try again";
        c = "red";
      }

      // p5.rect(430,140,10, 170);    // V
      // p5.rect(430,140,10, 170);    // V
      if (p5.mouseX > 430 && p5.mouseX < 440 && p5.mouseY > 140 && p5.mouseY < 310) {
        status = 0;
        message = "Try again";
        c = "red";
      }

      // p5.rect(320,135, 120, 10);   // H
      // p5.rect(320,135, 120, 10);   // H
      if (p5.mouseX > 320 && p5.mouseX < 440 && p5.mouseY > 120 && p5.mouseY < 130) {
        status = 0;
        message = "Try again";
        c = "red";
      }

      // p5.rect(320,160, 90, 10);    // H
      // p5.rect(320,160, 90, 10);    // H
      if (p5.mouseX > 320 && p5.mouseX < 410 && p5.mouseY > 160 && p5.mouseY < 170) {
        status = 0;
        message = "Try again";
        c = "red";
      }

      // ellipse(250,160, 85);
      if (p5.dist(250, 160, p5.mouseX, p5.mouseY) < 42.5) {
        status = 0;
        message = "Try again";
        c = "red";
      }

      // ellipse(165,100, 90);
      if (p5.dist(165, 100, p5.mouseX, p5.mouseY) < 45) {
        status = 0;
        message = "Try again";
        c = "red";
      }

      // ellipse(150,200, 97);
      if (p5.dist(150, 200, p5.mouseX, p5.mouseY) < 48.5) {
        status = 0;
        message = "Try again";
        c = "red";
      }

      if (status == -1) {
        c = "0";

        message = "Move the mouse to starting area to play";
      }
      p5.textSize(20);
      p5.fill(c);
      p5.text(message, p5.width / 2 - 200, p5.height / 2);
    };
  };
</script>

<div class="touch-none">
  <div>
    <P5 {sketch} />
  </div>
</div>
