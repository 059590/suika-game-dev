import { useEffect } from "react";
import PropTypes from "prop-types";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

import confetti from "canvas-confetti";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#F7F4C8",
  border: "5px solid #E6B143",
  p: 4,
};

export default function ResultModal({
  openResultModal,
  setOpenResultModal,
  disableActionRef,
  gameClear,
  gameRestart,
}) {
  /**
   * Game clear effect
   */
  function firework() {
    var duration = 15 * 100;
    var animationEnd = Date.now() + duration;

    //  startVelocity: 범위, spread: 방향, ticks: 개수, zIndex: z축
    var defaults = {
      startVelocity: 25,
      spread: 360,
      ticks: 500,
      zIndex: 10000,
    };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  }

  /**
   * Action upon game clearance
   */
  useEffect(() => {
    if (openResultModal && gameClear) {
      firework();
    } else {
      disableActionRef.current = false;
    }
  }, [openResultModal]);

  return (
    <Modal
      open={openResultModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEnforceFocus={true}
      disableAutoFocus={true}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Suika Game
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {gameClear ? "Clear" : "Fail"}
        </Typography>
        {gameClear && (
          <Button onClick={() => setOpenResultModal(false)}>계속하기</Button>
        )}
        <Button
          onClick={() => {
            gameRestart();
          }}
        >
          다시시작
        </Button>
      </Box>
    </Modal>
  );
}

ResultModal.propTypes = {
  openResultModal: PropTypes.bool,
  setOpenResultModal: PropTypes.func,
  disableActionRef: PropTypes.object,
  gameClear: PropTypes.bool,
  gameRestart: PropTypes.func,
};
