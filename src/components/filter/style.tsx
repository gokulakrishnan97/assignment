import { styled } from "styled-components";
import Button from "@mui/material/Button";

export const Container = styled.div`
  width: 25% !important;
  text-align: start !important;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonLabel = styled("Button")`
  height: fit-content;
  margin-top: 0;
  padding-top: 0;
`;

export const ReportButton = styled("Button")`
  height: fit-content;
  padding: 7px;
  position: absolute;
  bottom: 0;
  background: #0000ff;
  color: #fff;
  margin: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
`;
