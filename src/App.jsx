import "./App.css";
import { Engine, Render, World, Bodies, Body, Runner, Events } from "matter-js";
import { FRUITS_BASE } from "./assets/javascript/fruits";
import { useEffect, useRef, useState } from "react";
import HelpModal from "./assets/javascript/helpModal.jsx";
import ResultModal from "./assets/javascript/resultModal.jsx";

function App() {
  const containerRef = useRef();
  const canvasRef = useRef();
  const engineRef = useRef();
  const currentBodyRef = useRef();
  const intervalRef = useRef();
  const disableActionRef = useRef(false);

  const currentFruitRef = useRef();

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    localStorage.getItem("score") || 0
  );

  const [openResultModal, setOpenResultModal] = useState(false);
  const [gameClear, setGameClear] = useState(false);

  /**
   * Save score to local storage
   */
  useEffect(() => {
    if (score > highScore) {
      localStorage.setItem("score", score);
      setHighScore(score);
    }
  }, [score, highScore]);

  /**
   * Add random new fruit
   */
  function addFruit() {
    const index = Math.floor(Math.random() * 5);
    // test code
    // const index = 8;
    const fruit = FRUITS_BASE[index];

    const body = Bodies.circle(310, 90, fruit.radius, {
      index: index,
      isSleeping: true,
      render: {
        sprite: { texture: `${fruit.name}.png` },
      },
      restitution: 0.3,
    });

    currentBodyRef.current = body;
    currentFruitRef.current = fruit;

    World.add(engineRef.current.world, body);
  }

  /**
   * Game restart and close result modal
   */
  function gameRestart() {
    World.clear(engineRef.current.world, true);
    addFruit();
    setOpenResultModal(false);
  }

  /**
   * Rendering game
   */
  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = Engine.create();

      let render = Render.create({
        engine: engineRef.current,
        element: containerRef.current,
        canvas: canvasRef.current,
        options: {
          width: 620,
          height: 820,
          background: "#F7F4C8",
          wireframes: false,
        },
      });

      const topWall = Bodies.rectangle(310, 15, 620, 30, {
        isStatic: true,
        render: { fillStyle: "#E6B143" },
      });

      const ground = Bodies.rectangle(310, 805, 620, 30, {
        isStatic: true,
        render: { fillStyle: "#E6B143" },
      });

      const leftWall = Bodies.rectangle(15, 395, 30, 790, {
        isStatic: true,
        render: { fillStyle: "#E6B143" },
      });

      const rightWall = Bodies.rectangle(605, 395, 30, 790, {
        isStatic: true,
        render: { fillStyle: "#E6B143" },
      });

      const topLine = Bodies.rectangle(310, 150, 620, 5, {
        name: "topLine",
        isStatic: true,
        isSensor: true,
        render: { fillStyle: "rgba(230, 177, 67, 0.5)" },
      });

      World.add(engineRef.current.world, [
        leftWall,
        rightWall,
        ground,
        topLine,
        topWall,
      ]);

      Render.run(render);
      Runner.run(engineRef.current);

      addFruit();
    }

    // Key operation
    window.onkeydown = (event) => {
      if (disableActionRef.current) return;

      switch (event.code) {
        case "ArrowLeft":
          if (intervalRef.current) return;
          intervalRef.current = setInterval(() => {
            if (
              currentBodyRef.current.position.x -
                currentFruitRef.current.radius >
              30
            )
              Body.setPosition(currentBodyRef.current, {
                x: currentBodyRef.current.position.x - 1,
                y: currentBodyRef.current.position.y,
              });
          }, 5);
          break;

        case "ArrowRight":
          if (intervalRef.current) return;
          intervalRef.current = setInterval(() => {
            if (
              currentBodyRef.current.position.x +
                currentFruitRef.current.radius <
              590
            )
              Body.setPosition(currentBodyRef.current, {
                x: currentBodyRef.current.position.x + 1,
                y: currentBodyRef.current.position.y,
              });
          }, 5);
          break;

        case "Space":
          currentBodyRef.current.isSleeping = false;
          disableActionRef.current = true;

          setTimeout(() => {
            addFruit();
            disableActionRef.current = false;
          }, 1000);

          break;
      }
    };

    // Key operation
    window.onkeyup = (event) => {
      switch (event.code) {
        case "ArrowLeft":
        case "ArrowRight":
          clearInterval(intervalRef.current);
          intervalRef.current = null;
      }
    };

    /**
     * each fruit collides, remove and combine them. and display the result modal
     */
    Events.on(engineRef.current, "collisionStart", (event) => {
      event.pairs.some((collision) => {
        if (collision.bodyA.index === collision.bodyB.index) {
          const index = collision.bodyA.index;

          if (index === FRUITS_BASE.length - 1) return;

          World.remove(engineRef.current.world, [
            collision.bodyA,
            collision.bodyB,
          ]);

          const newFruit = FRUITS_BASE[index + 1];

          const newBody = Bodies.circle(
            collision.collision.supports[0].x,
            collision.collision.supports[0].y,
            newFruit.radius,
            {
              render: {
                sprite: { texture: `${newFruit.name}.png` },
              },
              index: index + 1,
            }
          );

          World.add(engineRef.current.world, newBody);

          setScore((score) => score + (index + 1) * 10);

          if (index === 9) {
            setTimeout(() => {
              setGameClear(true);
              setOpenResultModal(true);
            }, 500);
          }
        }

        if (
          !disableActionRef.current &&
          (collision.bodyA.name === "topLine" ||
            collision.bodyB.name === "topLine")
        ) {
          setGameClear(false);
          setOpenResultModal(true);
        }

        return collision.bodyA.index === collision.bodyB.index;
      });
    });
  }, []);

  return (
    <>
      <header>
        <h1>Suika Game</h1>
        <h2>최고기록 : {highScore}</h2>
        <h2>점수 : {score}</h2>
        <HelpModal gameRestart={gameRestart} />
        <ResultModal
          openResultModal={openResultModal}
          setOpenResultModal={setOpenResultModal}
          gameClear={gameClear}
          gameRestart={gameRestart}
        />
      </header>
      <div ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}

export default App;
