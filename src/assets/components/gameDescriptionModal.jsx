import * as React from "react";
import PropTypes from "prop-types";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import Link from "/icon/captive-portal-FILL0-wght400-GRAD0-opsz24.svg";
import SpaceBar from "/icon/space-bar-FILL0-wght400-GRAD0-opsz24.svg";
import ArrowLeft from "/icon/arrow-left-FILL0-wght400-GRAD0-opsz24.svg";
import ArrowRight from "/icon/arrow-right-FILL0-wght400-GRAD0-opsz24.svg";

import { FRUITS_BASE } from "../javascript/fruits";
import More from "/icon/chevron-right-FILL0-wght400-GRAD0-opsz24.svg";

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
      <button onClick={() => setOpen(true)} ref={helpModalBtn}>
        게임 설명
      </button>
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
            width: "40rem",
            bgcolor: "#F7F4C8",
            border: "5px solid #E6B143",
            p: 4,
          }}
        >
          <p className="description">
            <b className="watermelon">&quot;수박 게임&#34;</b>은&nbsp;
            <b>&quot;작은 과일&#34;</b>들을 합쳐서&nbsp;
            <b>&quot;큰 과일&#34;</b>을 만드는 게임입니다.
            <div className="evolutionFruit">
              {FRUITS_BASE.map((fruit, index) => {
                return (
                  <div key={index}>
                    <img
                      className="evolutionFruitImg"
                      src={`${fruit.name}.png`}
                      alt="Evolution fruit"
                    />

                    <img
                      className="evolutionFruitIcon"
                      src={More}
                      alt="Evolution fruit icon"
                      style={{ display: index === 10 ? "none" : "block" }}
                    />
                  </div>
                );
              })}
            </div>
            아래
            <b>&quot;과일 조작법&#34;</b>으로&nbsp;
            <b className="watermelon">&quot;수박&#34;</b>을 만들어 보세요!
          </p>

          <div className="keyDescriptionDiv">
            <span>
              <b>&quot;오른쪽&#34;</b>으로 과일 움직이기:&nbsp;
              <img src={ArrowRight} alt="link icon" />
            </span>

            <span>
              <b>&quot;왼쪽&#34;</b>으로 과일 움직이기:&nbsp;
              <img src={ArrowLeft} alt="link icon" />
            </span>

            <span>
              <b>&quot;아래&#34;</b>로 과일 떨어뜨리기:&nbsp;
              <img src={SpaceBar} alt="link icon" />
            </span>
          </div>

          <div className="linkDiv">
            <a
              href="https://github.com/059590/suika-game"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Developer github link"
            >
              개발자: Github&nbsp;
              <img src={Link} alt="Link icon" />
            </a>
            <a
              href="https://suika-game.app/ko"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suika game"
            >
              원작: Suika Game&nbsp;
              <img src={Link} alt="Link icon" />
            </a>
          </div>

          <div className="modalBtn">
            <button onClick={() => setOpen(false)}>계속하기</button>
            <button
              onClick={() => {
                gameRestart();
                setOpen(false);
              }}
            >
              다시시작
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

GameDescriptionModal.propTypes = {
  disableActionRef: PropTypes.object,
  gameRestart: PropTypes.func,
};
