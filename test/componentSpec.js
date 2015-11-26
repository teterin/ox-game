import chai, {expect} from 'chai';
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import mockery from 'mockery';


const findElement = (root, fun)=> {
    let result = [];
    const search = root=> {
        if (fun(root)) {
            result.push(root);
        }
        const children = root.props.children;
        if (!children) {
            return;
        }
        if (!Array.isArray(children)) {
            if (fun(children)) {
                result.push(children);
            } else {
                search(children);
            }
        } else {
            for (let i = 0; i < children.length; i++) {
                let element = children[i];
                if (!element.type) {
                    continue;
                }
                if (fun(element)) {
                    result.push(element);
                } else {
                    search(element);
                }
            }
        }
    }
    search(root);
    return result;
}
const findElementsByType = (root, type)=>findElement(root, element=>element.type === type);
const findElementsByClassName = (root, className)=>findElement(root, element=>element.props.className === className);

describe('components', () => {

    before(function () {
        mockery.enable();
        mockery.registerMock('./style', {});
    });

    after(function () {
        mockery.disable();
    });

    it('render player component', () => {
        const Player = require('../src/views/player');
        const onChange = chai.spy(()=> {
        });
        let renderer = TestUtils.createRenderer()
        renderer.render(<Player label="Test label" value="Test value" onChange={onChange}/>)
        let element = renderer.getRenderOutput()
        let input = findElementsByType(element, 'input')[0];
        input.props.onChange({target: {value: 'Test'}});
        expect(onChange).to.have.been.called();
    });

    it('render field component', () => {
        const Field = require('../src/views/field');
        const markPlace = chai.spy(()=> {
        });
        let renderer = TestUtils.createRenderer()
        renderer.render(<Field action={markPlace}/>)
        let element = renderer.getRenderOutput()
        let cell = findElementsByClassName(element, 'cell')[0];
        cell.props.onClick();
        expect(markPlace).to.have.been.called();
    });

    it('render arena component', () => {
        const Arena = require('../src/views/arena');
        const markPlace = chai.spy(()=> {
        });
        let renderer = TestUtils.createRenderer()
        renderer.render(<Arena matrix={[[null,null,null],[null,null,null],[null,null,null]]} action={markPlace}/>)
        let element = renderer.getRenderOutput()
        let row = findElementsByClassName(element, 'row').forEach(row=>row.props.children.forEach(child=>child.props.action()));
        expect(markPlace).to.have.been.called.exactly(9);
    });


});