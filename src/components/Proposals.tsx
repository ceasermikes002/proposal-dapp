import { useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

const ProposalsList = () => {
  const { proposals, fetchProposals, connected } = useWeb3();

  // Refetch proposals when wallet connects
  useEffect(() => {
    if (connected) {
      fetchProposals();
    }
  }, [connected, fetchProposals]);

  return (
    <div className="proposals-list">
      <h2>Proposals</h2>
      {proposals.length > 0 ? (
        <ul>
          {proposals.map((proposal) => (
            <li key={proposal.id} className="proposal-item">
              <p><strong>ID:</strong> {proposal.id}</p>
              <p><strong>Description:</strong> {proposal.description}</p>
              <p><strong>Recipient:</strong> {proposal.recipient}</p>
              <p><strong>Amount:</strong> {proposal.amount} ETH</p>
              <p><strong>Votes:</strong> {proposal.voteCount}</p>
              <p><strong>Deadline:</strong> {proposal.votingDeadline.toLocaleString()}</p>
              <p><strong>Minimum Votes to Pass:</strong> {proposal.minVotesToPass}</p>
              <p><strong>Executed:</strong> {proposal.executed ? 'Yes' : 'No'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No proposals found.</p>
      )}
    </div>
  );
};

export default ProposalsList;
