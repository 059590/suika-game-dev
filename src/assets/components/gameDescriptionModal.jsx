import * as React from "react";
import PropTypes from "prop-types";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Link from "/icon/captive-portal-FILL0-wght400-GRAD0-opsz24.svg";
import SpaceBar from "/icon/space-bar-FILL0-wght400-GRAD0-opsz24.svg";
import ArrowLeft from "/icon/arrow-left-FILL0-wght400-GRAD0-opsz24.svg";
import ArrowRight from "/icon/arrow-right-FILL0-wght400-GRAD0-opsz24.svg";

export default function GameDescriptionModal({
  disableActionRef,
  gameRestart,
}) {
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
        게임 설명
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEnforceFocus={true}
        disableAutoFocus={true}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#F7F4C8",
            border: "5px solid #E6B143",
            p: 4,
          }}
        >
          <p>
            수박 게임은&nbsp;<b>&quot;작은 과일&#34;</b>들을 합쳐서&nbsp;
            <b>&quot;큰 과일&#34;</b>을 만드는 게임입니다. 아래 과일
            조작법으로&nbsp;<b>&quot;수박&#34;</b>을 만들어 보세요!
          </p>
          <ul style={{ marginTop: "16px" }}>
            <li style={{ display: "flex", alignItems: "center" }}>
              <span> 오른쪽으로 과일 움직이기:</span>
              <img
                src={ArrowRight}
                alt="link icon"
                style={{
                  width: "30px",
                }}
              />
              <span>오른쪽 방향키</span>
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <span>왼쪽으로 과일 움직이기:</span>
              <img
                src={ArrowLeft}
                alt="link icon"
                style={{
                  width: "30px",
                }}
              />
              <span>왼쪽 방향키</span>
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <span>아래로 과일 떨어뜨리기:</span>
              <img
                src={SpaceBar}
                alt="link icon"
                style={{
                  width: "30px",
                }}
              />
              <span>스페이스바</span>
            </li>
          </ul>

          <ul style={{ marginTop: "16px" }}>
            <li style={{ display: "flex", alignItems: "center" }}>
              <a
                href="https://github.com/059590/suika-game"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Developer github link"
              >
                개발자: Github&nbsp;
              </a>
              <img
                src={Link}
                alt="link icon"
                style={{
                  width: "20px",
                }}
              />
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <a
                href="https://suika-game.app/ko"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suika game"
              >
                원작: Suika Game&nbsp;
              </a>
              <img
                src={Link}
                alt="link icon"
                style={{
                  width: "20px",
                }}
              />
            </li>
          </ul>
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

GameDescriptionModal.propTypes = {
  disableActionRef: PropTypes.object,
  gameRestart: PropTypes.func,
};
