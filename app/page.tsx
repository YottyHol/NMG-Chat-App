export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>AI Chat Interface - Take Home Assignment</h1>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>Getting Started</h2>
        <p>
          This is your starter repository. The mock API endpoints are already 
          set up for you. Your task is to build a chat interface that integrates 
          with these endpoints.
        </p>
        
        <h3 style={{ marginTop: '1.5rem' }}>Available API Endpoints:</h3>
        <ul>
          <li>
            <code>POST /api/chat</code> - Standard chat endpoint with simulated delay
          </li>
          <li>
            <code>POST /api/chat/stream</code> - Streaming endpoint (bonus feature)
          </li>
        </ul>
        
        <h3 style={{ marginTop: '1.5rem' }}>What to Build:</h3>
        <p>Please refer to the README.md for complete requirements and evaluation criteria.</p>
      </section>
      
      <section style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#f5f5f5',
        borderRadius: '4px' 
      }}>
        <strong>Note:</strong> You can delete this page and start fresh, or build 
        upon it. The choice is yours!
      </section>
    </main>
  );
}
