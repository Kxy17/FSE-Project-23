<script>
  import P5 from "p5-svelte";
  import { time } from "./Stopwatch";
  import { start } from "./Stopwatch";
  import { reset } from "./Stopwatch";
  import { pause } from "./Stopwatch";
  import { formatTime } from "./Stopwatch";
  let resetGame, points;
  const sketch = (p5) => {
    let shapes = [];
    let containers = [];
    let DraggedShape = null;
    let offsetX, offsetY;
    let message = "";
    let shapesInContainers = [];
    let winningMessage = "";

    // your constants already has been declared by me ..

    p5.setup = () => {
      // set up function
      // Here, insert yout code of setup function "only"
      p5.createCanvas(500, 400);
      shapes.push(new Shape(p5.width / 6, p5.height - 200, "red", "triangle"));
      shapes.push(
        new Shape(p5.width / 3, p5.height - 200, "lightblue", "circle")
      );
      shapes.push(new Shape(p5.width / 2, p5.height - 200, "green", "star"));
      shapes.push(
        new Shape((2 * p5.width) / 3, p5.height - 200, "red", "square")
      );
      shapes.push(
        new Shape((5 * p5.width) / 6, p5.height - 200, "green", "rectangle")
      );
      shapes.push(
        new Shape(
          ((7 * p5.width) / 7.4),
          p5.height - 200,
          "lightblue",
          "semicircle"
        )
      );

      // Create containers
      containers.push(new Container(p5.width / 4, p5.height - 20, "green"));
      containers.push(new Container(p5.width / 2, p5.height - 20, "red"));
      containers.push(
        new Container((3 * p5.width) / 4, p5.height - 20, "lightblue")
      );
    };

    p5.resetGame = () => {
      shapes = [];
      p5.Container1 = null;
      p5.Container2 = null;
      p5.Container3 = null;
      p5.ShapeBeingDragged = null;
      offsetX = 0;
      offsetY = 0;
      message = "";
      winningMessage = "";
      p5.recordIfInside = [];
      shapesInContainers = [];

      // Create shapes
      shapes.push(new Shape(p5.width / 6, p5.height - 200, "red", "triangle"));
      shapes.push(
        new Shape(p5.width / 3, p5.height - 200, "lightblue", "circle")
      );
      shapes.push(new Shape(p5.width / 2, p5.height - 200, "green", "star"));
      shapes.push(
        new Shape((2 * p5.width) / 3, p5.height - 200, "red", "square")
      );
      shapes.push(
        new Shape((5 * p5.width) / 6, p5.height - 200, "green", "rectangle")
      );
      shapes.push(
        new Shape(
          (7 * p5.width) / 8,
          p5.height - 200,
          "lightblue",
          "semicircle"
        )
      );

      // Create containers
      containers.push(new Container(p5.width / 4, p5.height - 20, "green"));
      containers.push(new Container(p5.width / 2, p5.height - 20, "red"));
      containers.push(
        new Container((3 * p5.width) / 4, p5.height - 20, "lightblue")
      );
    };
    resetGame = p5.resetGame;
    p5.startGame = () => {
      p5.resetGame();
      p5.loop();
    };

    p5.draw = () => {
      // draw function
      // Here, insert yout code of draw function "only"
      // Draw shapes
      p5.background("#E9DABC");

      shapes.forEach((shape) => shape.draw());

      // Draw containers
      containers.forEach((container) => container.draw());

      p5.textSize(20);
      p5.textAlign(p5.CENTER);
      p5.fill("black");
      p5.text(message, p5.width / 2, 70);
      p5.textSize(20);
      p5.textAlign(p5.CENTER);
      p5.fill("black");
      p5.text(winningMessage, p5.width / 2, 50);
      if (DraggedShape) {
        DraggedShape.x = p5.mouseX + offsetX;
        DraggedShape.y = p5.mouseY + offsetY;
      }
    };

    p5.mousePressed = () => {
      for (let i = 0; i < shapes.length; i++) {
        if (shapes[i].contains(p5.mouseX, p5.mouseY)) {
          DraggedShape = shapes[i];
          offsetX = DraggedShape.x - p5.mouseX;
          offsetY = DraggedShape.y - p5.mouseY;
          break;
        }
      }
    };
    p5.mouseReleased = () => {
      // Check if shape is dropped in container
      if (!DraggedShape) {
        return;
      }
      let inside = false;
      let mtch = false;
      for (let container of containers) {
        if (container.contains(p5.mouseX, p5.mouseY)) {
          inside = true;
          mtch = container.color == DraggedShape.color;
          break;
        }
      }

      if (inside) {
        if (mtch) {
          if (shapesInContainers.includes(DraggedShape)) {
            message = "Shape Already In Container";
          } else {
            shapesInContainers.push(DraggedShape);
            message = "Match!";
          }
        } else {
          message = "Incorrect Match!";
          if (shapesInContainers.includes(DraggedShape)) {
            shapesInContainers = shapesInContainers.filter(
              (x) => x != DraggedShape
            );
          }
        }
      } else {
        if (shapesInContainers.includes(DraggedShape)) {
          shapesInContainers = shapesInContainers.filter(
            (x) => x != DraggedShape
          );
        }
      }

      if (shapesInContainers.length == 6) {
        winningMessage = "Congratulations, you have won!";
        localStorage.setItem('points', (parseInt('points') + (points)).toString())
        pause();
        points++;
      } else {
        let remainder = 6 - shapesInContainers.length;
        points = shapesInContainers.length
        winningMessage = "You have only " + remainder + " remaining";
      }

      DraggedShape = null;
    };

    class Shape {
      constructor(x, y, color, shape) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.shape = shape;
      }

      draw() {
        p5.push();
        p5.fill(this.color); 
        p5.noStroke();
        if (this.shape === "triangle") {
          p5.triangle(
            this.x - 20,
            this.y + 20,
            this.x,
            this.y - 20,
            this.x + 20,
            this.y + 20
          );
        } else if (this.shape === "circle") {
          p5.ellipse(this.x, this.y, 40, 40);
        } else if (this.shape === "star") {
          p5.star(this.x, this.y, 15, 30, 5);
        } else if (this.shape === "square") {
          p5.rect(this.x - 20, this.y - 20, 40, 40);
        } else if (this.shape === "rectangle") {
          p5.rect(this.x - 20, this.y - 10, 40, 20);
        } else if (this.shape === "semicircle") {
          p5.arc(this.x, this.y + 20, 40, 40, p5.PI, 0);
        }

        p5.pop();
      }

      contains(x, y) {
        if (this.shape === "triangle") {
          let d = p5.dist(x, y, this.x, this.y);
          if (d < 30) {
            return true;
          }
        } else if (this.shape === "circle") {
          let d = p5.dist(x, y, this.x, this.y);
          if (d < 20) {
            return true;
          }
        } else if (this.shape === "star") {
          if (
            x > this.x - 20 &&
            x < this.x + 20 &&
            y > this.y - 20 &&
            y < this.y + 20
          ) {
            return true;
          }
        } else if (this.shape === "square") {
          if (
            x > this.x - 20 &&
            x < this.x + 20 &&
            y > this.y - 20 &&
            y < this.y + 20
          ) {
            return true;
          }
        } else if (this.shape === "rectangle") {
          if (
            x > this.x - 20 &&
            x < this.x + 20 &&
            y > this.y - 10 &&
            y < this.y + 10
          ) {
            return true;
          }
        } else if (this.shape === "semicircle") {
          let d = p5.dist(x, y, this.x, this.y + 20);
          if (d < 30) {
            return true;
          }
        }

        return false;
      }
    }

    class Container {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
      }

      draw() {
        p5.push();
        p5.stroke(this.color);
        p5.strokeWeight(3);
        p5.line(this.x, this.y, this.x, this.y - 100);
        p5.line(this.x, this.y, this.x + 100, this.y);
        p5.line(this.x + 100, this.y, this.x + 100, this.y - 100);

        p5.pop();
      }

      contains(x, y) {
        if (x > this.x && x < this.x + 100 && y > this.y - 100 && y < this.y) {
          return true;
        }
        return false;
      }
    }

    p5.star = (x, y, radius1, radius2, npoints) => {
      let angle = p5.TWO_PI / npoints;
      let halfAngle = angle / 2.0;
      p5.beginShape();
      for (let a = 0; a < p5.TWO_PI; a += angle) {
        let sx = x + p5.cos(a) * radius2;
        let sy = y + p5.sin(a) * radius2;
        p5.vertex(sx, sy);
        sx = x + p5.cos(a + halfAngle) * radius1;
        sy = y + p5.sin(a + halfAngle) * radius1;
        p5.vertex(sx, sy);
      }
      p5.endShape(p5.CLOSE);
    };
  };
  start();
</script>
<p>Score: {points}</p>
<p>Elapsed: {formatTime($time)}</p>
<div class="touch-none">
  <div>
    <P5 {sketch} />
  </div>
  <button on:click={resetGame}>Start/Restart</button>
</div>
<style>
   button{
    background-color: #B47F75;
  }
</style>