/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable import/named */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { ReactStrictMode, rootElement } from './index';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('index.js', () => {
  it('renders without crashing', () => {
    ReactDOM.render(ReactStrictMode, rootElement);
    expect(ReactDOM.render).toHaveBeenCalledWith(ReactStrictMode, rootElement)
  })
})