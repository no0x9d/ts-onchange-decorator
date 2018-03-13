# ts-onchange-decorator

A property or accessor decorator, which calls a change handler if a new value is assigned.

## Usage

```javascript
class Example {
    @OnChange('changeHandler')
    foo = 'bar'

    changeHandler(newFoo, oldFoo) {
        // do something with foo
    }
}
```

```javascript
class Example {
    @OnChange(Example.prototype.changeHandler)
    foo = 'bar'

    changeHandler(newFoo, oldFoo) {
        // do something with foo
    }
}
```

```javascript
class Example {
    @OnChange()
    foo = 'bar'

    fooChange(newFoo, oldFoo) {
        // do something with foo
    }
}
```

```javascript
class Example {
    @OnChange()
    set foo(value) {
        //
    } 

    fooChange(newFoo, oldFoo) {
        // do something with foo
        // Change handler is called after setter
    }
}
```