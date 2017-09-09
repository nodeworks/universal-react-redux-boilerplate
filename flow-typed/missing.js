declare module 'redux-first-router' {
  declare module.exports: any;
}

declare module 'react-universal-component' {
  declare module.exports: any;
}

declare var module : {
  hot : {
    accept(path:string, callback:() => void): void;
  };
};
