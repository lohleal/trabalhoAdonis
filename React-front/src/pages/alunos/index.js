import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Select, Submit, FlexRow } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';
import { LabelEndereco } from './style'; // importa o novo label




export default function CreateAluno() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [rua, setRua] = useState('');
  const [nCasa, setNCasa] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const [cursoId, setCursoId] = useState('');
  const [cursos, setCursos] = useState([]);
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();
  const permissions = getPermissions();
  const dataUser = getDataUser();

  // Funções de fetch, permission, etc...
  // (mantém como você tinha)

  useEffect(() => {
    if (!dataUser) navigate('/login');
    else if (permissions.createAluno === 0) navigate(-1);

    setLoad(true);
    Client.get('cursos')
      .then(res => setCursos(res.data.data))
      .catch(console.error)
      .finally(() => setLoad(false));
  }, []);

  function sendData() {
    const aluno = {
      nome,
      curso_id: Number(cursoId),
      email,
      senha,
      cidade,
      estado,
      rua,
      cpf,
      nCasa: Number(nCasa),
    };

    Client.post('alunos', aluno)
      .then(() => navigate('/alunos'))
      .catch(console.error);
  }

  return (
    <>
      <NavigationBar />
      {load ? (
        <Container className="d-flex justify-content-center mt-5">
          <OrbitProgress variant="spokes" color="#d6add6ff" size="medium" />
        </Container>
      ) : (
        <Container className='mt-2'>
          <div>
            <div>
              <Label>Nome</Label>
              <Input type="text" value={nome} onChange={e => setNome(e.target.value)} />
            </div>

            <div>
              <Label>Email</Label>
              <Input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            {/* CPF e Senha lado a lado */}
            <FlexRow>
              <div style={{ flex: 1 }}>
                <Label>CPF</Label>
                <Input type="text" value={cpf} onChange={e => setCpf(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <Label>Senha</Label>
                <Input type="text" value={senha} onChange={e => setSenha(e.target.value)} />
              </div>
            </FlexRow>

            {/* Cidade e Estado lado a lado */}
            <LabelEndereco>ENDEREÇO</LabelEndereco>
            <FlexRow>
              <div style={{ flex: 1 }}>
                <Label>Cidade</Label>
                <Input type="text" value={cidade} onChange={e => setCidade(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <Label>Estado</Label>
                <Input type="text" value={estado} onChange={e => setEstado(e.target.value)} />
              </div>
            </FlexRow>

            {/* Rua e Nº da Casa lado a lado */}
            <FlexRow>
              <div style={{ flex: 1 }}>
                <Label>Rua</Label>
                <Input type="text" value={rua} onChange={e => setRua(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <Label>Nº da Casa</Label>
                <Input type="number" value={nCasa} onChange={e => setNCasa(e.target.value)} />
              </div>
            </FlexRow>
          </div>

          <div className="mt-3">
            <Submit value="Voltar" onClick={() => navigate('/alunos')} />
            <Submit value="Cadastrar" onClick={sendData} />
          </div>
        </Container>
      )}
    </>
  );
}