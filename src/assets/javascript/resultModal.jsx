import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

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

export default function ResultModal({
  openResultModal,
  setOpenResultModal,
  gameClear,
  gameRestart,
}) {
  // TODO: 결과 모달 표시 중에 키 조작 제어
  return (
    <Modal
      open={openResultModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
  gameClear: PropTypes.bool,
  gameRestart: PropTypes.func,
};

ResultModal.defaultProps = {
  openResultModal: false,
  setOpenResultModal: () => {},
  gameClear: false,
  gameRestart: () => {},
};
