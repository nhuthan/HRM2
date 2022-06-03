import React, { createContext, useState, useEffect } from 'react'
const AppContext = createContext();

import detectEthereumProvider from '@metamask/detect-provider';
import { loadContract } from '@/utils/contract';

export const AppProvider = ({ children }) => {
    const [enums, setEnums] = useState(false);
    const [options, setOptions] = useState(null);

    //wallet
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(0);

    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        tokenContract: null //contract của đồng coin
    });


    const loadBalance = async (tokenContract, web3) => {
        if (tokenContract, account) {
            const bl = await tokenContract.balanceOf(account)
            setBalance(web3.utils.fromWei(bl, "ether"))
        }
    }

    const getAccount = async (web3) => {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts ? accounts[0] : null)
    }

    const loadProvider = async () => {
        const provider = await detectEthereumProvider()
        if (provider) {
            provider.on("accountsChanged", accounts => setAccount(accounts ? accounts[0] : null))
            const tokenContract = await loadContract("Token", provider)
            const web3 = new Web3(provider);
            setWeb3Api({
                web3,
                provider,
                tokenContract
            })
            getAccount(web3);
        } else {
            console.error("please, Install Metamask")
        }
    }

    useEffect(() => {
        loadProvider()
    }, []);


    useEffect(() => {
        if (web3Api.tokenContract)
            loadBalance(web3Api.tokenContract, web3Api.web3)
    }, [account]);

    return (
        <AppContext.Provider value={{
            enums, setEnums, options, setOptions, web3Api, wallet: {
                account,
                balance
            }
        }}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContext;