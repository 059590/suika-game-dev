import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

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

export default function HelpModal({ disableActionRef, gameRestart }) {
  const [open, setOpen] = React.useState(false);
  const helpModalBtn = React.useRef();

  React.useEffect(() => {
    if (open) {
      disableActionRef.current = true;
    } else {
      disableActionRef.current = false;
      helpModalBtn.current.blur();
    }
  }, [open]);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        disableFocusRipple={true}
        ref={helpModalBtn}
      >
        도움말
      </Button>
      <Modal
        open={open}
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
            Suika Game은 <b>"작은 과일"</b>들을 합쳐서 <b>"큰 과일"</b>을 만드는
            게임입니다.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            왼쪽으로 과일 움직이기 : 왼쪽 방향키
            <br />
            오른쪽으로 과일 움직이기 : 오른쪽 방향키
            <br />
            과일 떨어뜨리기 : 스페이스바
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <a href="https://github.com/059590/suika-game">Github Link</a>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={() => setOpen(false)}>계속하기</Button>
            <Button
              onClick={() => {
                gameRestart();
                setOpen(false);
              }}
            >
              다시시작
            </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

HelpModal.propTypes = {
  disableActionRef: PropTypes.object,
  gameRestart: PropTypes.func,
};
