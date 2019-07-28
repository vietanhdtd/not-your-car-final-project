function App() {
    const [token, setToken] = useState('');
    const[currentUser, setCurrentUser] = useState({id:null})
    const [products, setProducts] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    console.log('batman ', products)

    
    const accessToken =
    window.location.search.split('=')[0] === '?api_key'
    ? window.location.search.split('=')[1]
    : null;
    const existingToken = sessionStorage.getItem('token');


    
    useEffect(() => {
        getUser()
       
        if (accessToken) {
            sessionStorage.setItem('token', accessToken.replace('?api_key=', ''));
            setToken(accessToken.replace('?api_key=', ''));
            setIsLogged(true);
        }
        if (existingToken) {
            setToken(existingToken.replace('?api_key=', ''));
            setIsLogged(true);
        }
    },[]);
    
    const getUser = async () => {
        const response = await fetch('https://127.0.0.1:5000/checklogin', {
            headers: {
              Authorization: `Token ${sessionStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
          })
          const result = await response.json()
          setCurrentUser(result)

          console.log('RESPONSE IN APP', response)
    }
