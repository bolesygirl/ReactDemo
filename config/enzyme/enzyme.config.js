import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "regenerator-runtime/runtime";

Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.mount = mount; 