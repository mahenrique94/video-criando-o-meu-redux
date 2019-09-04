const middlewares = []

const compose = fns => fns.reduce(
    (acc, fn) => () => acc(fn())
)

const m1 = () => console.log('LOGUEI O M1')
const m2 = () => console.log('LOGUEI O M2')
const m3 = () => console.log('LOGUEI O M3')

middlewares.push(m1)
middlewares.push(m2)
middlewares.push(m3)

const chain = compose(middlewares)
chain()
