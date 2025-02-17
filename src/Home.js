import React, { useState, useEffect } from 'react';

const FormScreen = () => {
  const [name, setName] = useState('');
  const [block, setBlock] = useState('');
  const [description, setDescription] = useState('');
  const [blocks, setBlocks] = useState([]);
  const [blockPages, setBlockPages] = useState({}); 
  const [URL, setURL] = useState('');

  const getData = async () => {
    try {
      const response = await fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/{/d/1nKRquKGNROYY7YM9-MJYOcOIe3yCvwqdcMg0zajSLn8/edit?gid=1681336337#gid=1681336337}'
      );
      const data = await response.json();

      if (data.values) {
        const blocksFromSheet = {};
        const blockList = data.values.slice(1).map(row => {
          const blockName = row[0]; 
          const blockUrl = row[1]; 
          blocksFromSheet[blockName] = blockUrl;
          return blockName;
        });

        setBlocks(blockList);
        setBlockPages(blocksFromSheet);
      }
    } catch (error) {
      console.error('Erro ao buscar dados da planilha:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Nome: ${name}, URL: ${URL}, Bloco: ${block}, Descrição: ${description}`);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="URL"
          value={URL}
          onChange={(e) => setURL(e.target.value)}
          style={styles.input}
        />

        <select
          value={block}
          onChange={(e) => {
            setBlock(e.target.value);
            setURL(blockPages[e.target.value] || ''); 
          }}
          style={styles.input}
        >
          <option value="">Selecione um bloco</option>
          {blocks.length > 0 ? (
            blocks.map((blockName, index) => (
              <option key={index} value={blockName}>
                {blockName}
              </option>
            ))
          ) : (
            <option>Carregando blocos...</option>
          )}
        </select>

        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Cadastrar</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '350px',
    gap: '20px',
  },
  input: {
    height: '50px',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#dcdcdc',
  },
  button: {
    height: '50px',
    backgroundColor: '#a4d6a4',
    color: 'white',
    fontSize: '18px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default FormScreen;
