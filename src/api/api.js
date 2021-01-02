export const getData = (mode) => {
//testing
    const dataSetSmall = './data-examples/small.json';
    const dataSetBig = './data-examples/big.json';
    //www.filltext.com have some troubles with certificate. Clients have bugs. Not good, I think.
    //const dataSetSmall = 'https://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    //const dataSetBig = 'https://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

    let path = null;

    switch (mode) {
        case 'BIG': {
            path = dataSetBig;
            break
        }
        case 'SMALL': {
            path = dataSetSmall;
            break
        }
    }

    return fetch(path).then(response => response.json()).catch(err => alert(err));
}
