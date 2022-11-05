const CONSTS = {
    auth : {'Authorization': localStorage.getItem('X-Access-Type')+' '+localStorage.getItem('X-Access-Token')}
}

export default CONSTS