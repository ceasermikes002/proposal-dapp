import { useState } from "react";
import ProposalsList from "./components/Proposals";
import CreateProposal from "./components/CreateProposal";
import Modal from "./components/Modal";
import { Web3Provider } from "./context/Web3Context";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <Web3Provider>
      <div>
        <div className="text-red-400 font-bold">
          <ProposalsList />
        </div>

        <button
          onClick={openModal}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Create New Proposal
        </button>

        {/* Modal for Creating Proposal */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-2xl font-bold mb-4">Create New Proposal</h2>
          <CreateProposal onClose={closeModal} />
        </Modal>
      </div>
    </Web3Provider>
  );
};

export default App;
