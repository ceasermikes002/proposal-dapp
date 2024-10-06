import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ProposalContractABI from '../ABI/proposal.json';  // Your ABI
import useRunners from '../hooks/useRunners';  // Import your useRunners hook

interface Web3ContextType {
  contract: ethers.Contract | null;
  wallet: any;
  connected: boolean;
  signer: ethers.Signer | null;
  proposals: any[];  // Array to store proposals
  fetchProposals: () => void;  // Function to fetch proposals
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: any) => {
  const { signer, provider } = useRunners();  // Use your signer from useRunners
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [connected, setConnected] = useState<boolean>(false);  // Actual wallet connection state
  const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    const setupContract = async () => {
      if (signer && provider) {
        const contractInstance = new ethers.Contract(
          '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8',  // Contract address
          ProposalContractABI,
          signer
        );
        setContract(contractInstance);
        setConnected(true);
      }
    };
    setupContract();
  }, [signer, provider]);

  // Function to fetch all proposals
  const fetchProposals = async () => {
    if (!contract) return;

    const proposalCount = await contract.proposalCount();
    const proposalsData = [];

    for (let i = 1; i < proposalCount; i++) {
      const proposal = await contract.proposals(i);
      proposalsData.push({
        id: i,
        description: proposal.description,
        recipient: proposal.recipient,
        amount: ethers.formatEther(proposal.amount),
        voteCount: proposal.voteCount.toString(),
        votingDeadline: new Date(proposal.votingDeadline.toNumber() * 1000),
        minVotesToPass: proposal.minVotesToPass.toString(),
        executed: proposal.executed,
      });
    }
    setProposals(proposalsData);
  };

  useEffect(() => {
    if (contract) {
      fetchProposals();  // Fetch proposals when contract is available
    }
  }, [contract]);

  return (
    <Web3Context.Provider value={{ contract, wallet: null, connected, proposals, fetchProposals, signer }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
