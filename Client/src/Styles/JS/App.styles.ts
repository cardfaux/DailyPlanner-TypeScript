import styled, { createGlobalStyle } from 'styled-components';
import { Primary } from './Colors';

export const Main = styled.main`
  margin-top: 5rem;
`;

export const GlobalStyle = createGlobalStyle`
  body {
		padding: 0;
    margin: 0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	}
	html {
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
* {
	box-sizing: border-box;
}
.slide-in-left-enter {
  transform: translateX(-100%);
}

.slide-in-left-enter-active {
  transform: translateX(0);
  opacity: 1;
  transition: all 200ms;
}

.slide-in-left-exit {
  transform: translateX(0%);
  opacity: 1;
}

.slide-in-left-exit-active {
  transform: translateX(-100%);
  opacity: 0;
  transition: all 200ms;
}

.center {
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal-enter {
	transform: translateY(-10rem);
	opacity: 0;
}

.modal-enter-active {
	transform: translateY(0);
	opacity: 1;
	transition: all 200ms;
}

.modal-exit {
	transform: translateY(0);
	opacity: 1;
}

.modal-exit-active {
	transform: translateY(-10rem);
	opacity: 0;
	transition: all 200ms;
}

.place-item__modal-content {
  padding: 0;
}

.place-item__modal-actions {
	margin-bottom: 1rem;
  text-align: right;
}

.rbc-event-content {
	text-align: center;
	background: ${Primary};
}

.rbc-event {
	text-align: center;
	background-color: ${Primary};
}

.rbc-selected {
	text-align: center;
	background-color: ${Primary};
}

.rbc-event-allday {
	text-align: center;
	background: ${Primary};
}
`;
