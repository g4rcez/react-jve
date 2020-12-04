# react-jve

### Motivation

Viewing JSON is interesting in some application points. However, some React components can be too complex or too large to use in simple projects or cases.

I was using [react-json-viewer](https://www.npmjs.com/package/react-json-view) and it motivated me to create a simple and maintainable json-viewer (this is 2 years without maintenance)

### Install

```
npm install react-jve
# or
yarn add react-jve
```

### Using

```
const State = [
  {
    a: 1,
    b: 2,
    c: [
      1,
      2,
      3.12,
      4,
      5,
      null,
      undefined,
      new Date(),
      { a: 1, b: [1, 2, { a: [{ a: 1 }] }] },
    ],
  },
];

const View () => {
  const [main, setMain] = useState(State);
  return (
    <JsonEditor
      onChange={(e) => {
        setMain(e);
        console.log(e);
      }}
      data={main}
    />
  );
};
```
