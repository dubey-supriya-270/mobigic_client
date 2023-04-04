//import the API_URL
import { API_URL } from "./../../actions/serverConnection";
import {
  SIGN_IN,
  SIGN_IN_ERROR,
  ADD_USER_ERROR,
  START_LOADING,
  STOP_LOADING,
  ADD_USER,
} from "./../../actions/Types";
//import all the action creators
import * as actions from "../../actions/user";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

describe("Testing User Action", () => {
  //create mock functions called userDispatch and loadingDispatch
  const userDispatch = jest.fn();
  const loadingDispatch = jest.fn();
  jest.setTimeout(10000);
  //clear all mocks after the end of all the test cases in this describe blocl
  afterAll(() => {
    jest.clearAllMocks();
  });

  //create an instance of the MockAdapter
  const mock = new MockAdapter(axios);

  it("should call the dispatch funtion with the type SIGN_IN and payload as the token", (done) => {
    //create an expected response from the API
    const responseFromAPI = { data: { token: "jwttoken" } };
    //setup a stub on the request and mock the reply
    mock.onPost(`${API_URL}/auth`).replyOnce(200, responseFromAPI);
    //call the signIn action creator
    actions
      .signIn(
        "test@mail.com",
        "testtesttest",
        undefined //pass history param as undefined because it is not required
      )(userDispatch, loadingDispatch)
      .then(() => {
        //expect the loadingDispatch mock function to have been called with the right type
        expect(loadingDispatch).toHaveBeenCalledWith({ type: START_LOADING });
        //expect the userDispatch mock function to have been called with the right type
        expect(userDispatch).toHaveBeenCalledWith({
          type: SIGN_IN,
          payload: responseFromAPI.data,
        });
        //expect the loadingDispatch mock function to have been called with the right type
        expect(loadingDispatch).toHaveBeenCalledWith({ type: STOP_LOADING });
        //done is used to wait for async callbacks to be executed before finishing the execution of the test
        done();
      });
  });

  it("should call the dispatch funtion with the type SIGN_IN_ERROR and payload as the error message", (done) => {
    //create an expected response from the API
    const responseFromAPI = {
      message: "Invalid Credentials",
    };
    //setup a stub on the request and mock the reply
    mock.onPost(`${API_URL}/auth`).replyOnce(400, responseFromAPI);
    //call the signIn action creator
    actions
      .signIn(
        "test@mail.com",
        "testtesttest",
        undefined //pass history param as undefined because it is not required
      )(userDispatch, loadingDispatch)
      .then(() => {
        //expect the loadingDispatch mock function to have been called with the right type
        expect(loadingDispatch).toHaveBeenCalledWith({ type: START_LOADING });
        //expect the userDispatch mock function to have been called with the right type
        expect(userDispatch).toHaveBeenCalledWith({
          type: SIGN_IN_ERROR,
          payload: responseFromAPI,
        });
        //expect the loadingDispatch mock function to have been called with the right type
        expect(loadingDispatch).toHaveBeenCalledWith({ type: STOP_LOADING });
        //done is used to wait for async callbacks to be executed before finishing the execution of the test
        done();
      });
  });

  it("should call the dispatch funtion with the type SIGN_UP and payload as the token", (done) => {
    //create an expected response from the API
    const responseFromAPI = { message: "User added successfully" };
    //setup a stub on the request and mock the reply
    mock.onPost(`${API_URL}/user/register`).replyOnce(200, responseFromAPI);
    //call the signUp action creator
    actions
      .addUser(
        "test",
        "test123",
        undefined
      )(userDispatch, loadingDispatch)
      .then(() => {
        //expect the loadingDispatch mock function to have been called with the right type
        expect(loadingDispatch).toHaveBeenCalledWith({ type: START_LOADING });
        //expect the userDispatch mock function to have been called with the right type
        expect(userDispatch).toHaveBeenCalledWith({
          type: ADD_USER,
          payload: responseFromAPI.message,
        });
        //expect the loadingDispatch mock function to have been called with the right type
        expect(loadingDispatch).toHaveBeenCalledWith({ type: STOP_LOADING });
        //done is used to wait for async callbacks to be executed before finishing the execution of the test
        done();
      });
  });
  it("should call the dispatch funtion with the type SIGN_UP_ERROR and payload as the error message", (done) => {
    //create an expected response from the API
    const responseFromAPI = {
      message: "User already exists",
    };
    //setup a stub on the request and mock the reply
    mock.onPost(`${API_URL}/user/register`).replyOnce(400, responseFromAPI);
    //call the signUp action creator
    actions
      .addUser(
        "test",
        "test123",
        undefined
      )(userDispatch, loadingDispatch)
      .then(() => {
        //expect the loadingDispatch mock function to have been called with the right type
        expect(loadingDispatch).toHaveBeenCalledWith({ type: START_LOADING });
        //expect the userDispatch mock function to have been called with the right type
        expect(userDispatch).toHaveBeenCalledWith({
          type: ADD_USER_ERROR,
          payload: responseFromAPI.message,
        });
        //expect the loadingDispatch mock function to have been called with the right type
        expect(loadingDispatch).toHaveBeenCalledWith({ type: STOP_LOADING });
        //done is used to wait for async callbacks to be executed before finishing the execution of the test
        done();
      });
  });
});
