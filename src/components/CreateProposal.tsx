import { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface CreateProposalProps {
  onClose: () => void;
}

const CreateProposal = ({ onClose }: CreateProposalProps) => {
  const { contract, signer } = useWeb3();
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [votingPeriod, setVotingPeriod] = useState("");
  const [minVotesToPass, setMinVotesToPass] = useState("");
  const [loading, setLoading] = useState(false);

  const createProposal = async () => {
    if (!contract || !signer) {
      toast.error("You are not connected. Please connect your wallet to proceed.");
      return;
    }

    try {
      setLoading(true);

      const tx = await contract.createProposal(
        description,
        recipient,
        ethers.parseEther(amount), // Convert to wei
        votingPeriod, 
        minVotesToPass
      );

      await tx.wait();
      toast.success("Proposal created successfully!");
      onClose();  // Close the modal
    } catch (error) {
      console.error("Error creating proposal:", error);
      toast.error("Failed to create proposal.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProposal();
  };

  return (
    <div>
      <ToastContainer /> {/* Toast container for notifications */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Amount (ETH)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Voting Period (in seconds)</label>
          <input
            type="text"
            value={votingPeriod}
            onChange={(e) => setVotingPeriod(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Minimum Votes to Pass</label>
          <input
            type="text"
            value={minVotesToPass}
            onChange={(e) => setMinVotesToPass(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Creating Proposal..." : "Create Proposal"}
        </button>
      </form>
    </div>
  );
};

export default CreateProposal;
