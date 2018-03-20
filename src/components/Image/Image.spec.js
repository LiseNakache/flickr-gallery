// import 'jsdom-global/register';
import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import Image from './Image.js';

// Mocha: Testing Framework, used to run tests and show the results.

// Chai: Assertion Library, used to determine under what conditions a test will pass.

// Sinon: Mocking Utility, used to mock functions to isolate code and mimic test scenarios.

// Enzyme: React Testing Utility, used to mount React components on a virtual DOM, 
// which allows you to interact with the React component without actually rendering the component in a browser.


describe('Image', () => {

  const sampleImage = {id: '28420720169', owner: '59717246@N05', secret: 'd460443ecb', server: '4722', farm: 5};

  let wrapper;
  const galleryWidth = 1111;

  const mountImage = () => {
    return shallow(
      <Image dto={sampleImage} galleryWidth={galleryWidth}/>,
      {lifecycleExperimental: true, attachTo: document.createElement('div')}
    );
  };

  beforeEach(() => {
    wrapper = mountImage();
  });

  it('render 3 icons on each image', () => {
    expect(wrapper.find('FontAwesome').length).to.equal(3);
  });

  it('calc image size on mount', () => {
    const spy = sinon.spy(Image.prototype, 'calcImageSize');
    wrapper = mountImage();
    expect(spy.called).to.be.true;
  });

  it('calculate image size correctly', () => {
    const imageSize = wrapper.state().size;
    const remainder = galleryWidth % imageSize;
    expect(remainder).to.be.lessThan(1);
  });

});
