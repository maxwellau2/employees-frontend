import React from "react";
import "./PageHandler.css";
import { Box, Button, Typography } from "@mui/material";
import useWindowDimensions from "../../custom-hooks/GetWindowDimesions";

interface PageHandlerInterface {
  start: number | undefined;
  end: number | undefined;
  pageNumber: number;
  totalEntries: number | undefined;
  state: [number, React.Dispatch<React.SetStateAction<number>>];
}

const PageHandler = (props: PageHandlerInterface) => {
  const { width } = useWindowDimensions();
  const isMobileView: boolean = width < 600;

  const [pageState, setPageState] = props.state;

  const increasePageState = () => {
    setPageState(pageState + 1);
    console.log(props.end, props.totalEntries);
  };

  const dereasePageState = () => {
    console.log(props.end, props.totalEntries);
    setPageState(pageState - 1);
  };

  const isFirstPage = pageState === 0;
  const isLastPage = props.end === props.totalEntries;

  return (
    <Box className="apply-flex">
      {/* Display page number and number of employees */}
      {!isMobileView ? (
        <Typography margin={"auto 0 auto 0"}>
          Showing <strong>{props.start}</strong> - <strong>{props.end}</strong>{" "}
          out of <strong>{props.totalEntries}</strong> entries
        </Typography>
      ) : (
        <Box />
      )}
      {/* Previous and Next Buttons */}
      <Box className="apply-flex">
        <Button
          sx={{ color: "blue", "&:hover": { textDecoration: "underline" } }}
          disabled={isFirstPage}
          onClick={dereasePageState}
        >
          Previous
        </Button>
        <Typography margin={"auto 0 auto 0"}>
          <strong>{props.pageNumber}</strong>
        </Typography>
        <Button
          sx={{ color: "blue", "&:hover": { textDecoration: "underline" } }}
          disabled={isLastPage}
          onClick={increasePageState}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PageHandler;
