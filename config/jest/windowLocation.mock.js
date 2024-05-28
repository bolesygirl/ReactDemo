const { location } = window;

beforeAll(() => {
    delete window.location;
    window.location = Object.defineProperties({}, {
        ...Object.getOwnPropertyDescriptors(location),
        assign: {
            writable: true,
            value: jest.fn()
        }
    })
});

afterAll(() => {
    window.location = location;
});
