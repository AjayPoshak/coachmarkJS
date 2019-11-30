# CoachmarkJS

## Why ??

Often while building amazing UIs, we forget to build an onboarding experience.  Without onboarding, user might not know how to best use it.  This package helps you to make a good onboaring experience, by making just a few changes in your document.

## Installation

To install via npm run
``` npm install coachmarkjs ```

Or yarn
``` yarn add coachmarkjs ```

### Usage

Import the package
```js 
    import Coachmark from 'coachmarkjs'
```

Add the data-attribute `data-coachmark` to your DOM element which you want to highlight.
This attribute takes a number which lets you specify the order in which the elements would be
highlighted. DOM Element with attribute `data-coachmark = 0` will be highlighted before element with attribute `data-coachmark = 1`

Similarly, add the data-attribute `data-coachmark-text` to DOM element for the tooltip text.

As shown below,

```html
    <article
        class="column"
        data-coachmark="4"
        data-coachmark-text="The tooltip text"
    >
        <div>
            <img src="..." alt="" />
        </div>
        <p class="__text">
            This is a text element
        </p>
    </article>
```

To initialize it

```js
    Coachmark.init()
```

For React users,

```js
    // Onboarding Component
    import Coachmark from 'coachmarkjs'
    class Onboarding extends React.Component {

        componentDidMount() {
            Coachmark.init()
        }

        componentWillUnmount() {
            Coachmark.destroy()
        }

        render() {
            return (
                <section data-coachmark="0" data-coachmark-text="Tap here for next image">
                    //.....
                </section>
            )
        }
    }
```

It uses dynamic style sheets which are created inly after `Coachmark.init()` is called and destroyed as soon as `Coachmark.destroy()` is called. This is a flexible approach, as it
allows these styles to be overriden to suit the styling of the app.
