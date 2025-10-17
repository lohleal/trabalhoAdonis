import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Select, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function CreateAluno() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [rua, setRua] = useState('');
    const [n_casa, setN_casa] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');

    //const [cursoId, setCursoId] = useState('');
    //const [cursos, setCursos] = useState([]);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    // Função para gerar um código aleatório no formato 1234-5
    function gerarCodigoAleatorio() {
        const parte1 = Math.floor(1000 + Math.random() * 9000); // de 1000 a 9999
        const parte2 = Math.floor(Math.random() * 10);          // de 0 a 9
        return `${parte1}-${parte2}`;
    }

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.createAluno === 0) navigate(-1);
    }

    function fetchData() {
        setTimeout(() => setLoad(false), 500);
      }    

    function sendData() {
        console.log('Senha enviada:', senha);
        const aluno = {
            nome,
            //curso_id: Number(cursoId),
            email,
            senha,
            cidade,
            estado,
            rua,
            cpf,
            n_casa: Number(n_casa),
            
        };

        Client.post('alunos', aluno)
            .then(() => navigate('/alunos'))
            .catch(console.error);
    }

    

    useEffect(() => {
        verifyPermission();
        fetchData();
    }, []);

    return (
        <>
            <NavigationBar />
            {load
                ? <Container className="d-flex justify-content-center mt-5">
                    <OrbitProgress variant="spokes" color="#d6add6ff" size="medium" />
                </Container>
                : <Container className='mt-2'>
                    <div>
                        <div className="flex-grow-1">
                            <Label>Nome</Label>
                            <Input
                                type="text"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                            />
                        </div>
                        <div className="flex-grow-1">
                            <Label>Cpf</Label>
                            <Input
                                type="text"
                                value={cpf}
                                onChange={e => setCpf(e.target.value)}
                            />
                        </div>
                        <div className="flex-grow-1">
                            <Label>Email</Label>
                            <Input
                                type="text"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex-grow-1">
                            <Label>Senha</Label>
                            <Input
                                type="text"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                            />
                        </div>

                        <Label>ENDEREÇO</Label>
                        <div className="flex-grow-1">
                            <Label>Cidade</Label>
                            <Input
                                type="text"
                                value={cidade}
                                onChange={e => setCidade(e.target.value)}
                            />
                        </div>
                        <div className="flex-grow-1">
                            <Label>Estado</Label>
                            <Input
                                type="text"
                                value={estado}
                                onChange={e => setEstado(e.target.value)}
                            />
                        </div>
                        <div className="flex-grow-1">
                            <Label>Rua</Label>
                            <Input
                                type="text"
                                value={rua}
                                onChange={e => setRua(e.target.value)}
                            />
                        </div>
                        <div className="flex-grow-1">
                            <Label>Nº da Casa</Label>
                            <Input
                                type="number"
                                value={n_casa}
                                onChange={e => setN_casa(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-3">
                        <Submit value="Voltar" onClick={() => navigate('/alunos')} />
                        <Submit value="Cadastrar" onClick={sendData} />
                    </div>

                </Container>
            }
        </>
    );
}









/*


import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function CreateAluno() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [rua, setRua] = useState('');
  const [nCasa, setNCasa] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [load, setLoad] = useState(true);

  const navigate = useNavigate();
  const permissions = getPermissions();
  const dataUser = getDataUser();

  function verifyPermission() {
    if (!dataUser) navigate('/login');
    else if (permissions.createAluno === 0) navigate(-1);
  }

  function fetchData() {
    // Como não há mais cursos, podemos apenas simular um carregamento breve
    setTimeout(() => setLoad(false), 500);
  }

  function sendData() {
    const aluno = {
      nome,
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

  useEffect(() => {
    verifyPermission();
    fetchData();
  }, []);

  return (
    <>
      <NavigationBar />
      {load ? (
        <Container className="d-flex justify-content-center mt-5">
          <OrbitProgress variant="spokes" color="#d6add6ff" size="medium" />
        </Container>
      ) : (
        <Container className="mt-2">
          <div>
            <div className="flex-grow-1">
              <Label>Nome</Label>
              <Input type="text" value={nome} onChange={e => setNome(e.target.value)} />
            </div>
            <div className="flex-grow-1">
              <Label>CPF</Label>
              <Input type="text" value={cpf} onChange={e => setCpf(e.target.value)} />
            </div>
            <div className="flex-grow-1">
              <Label>Email</Label>
              <Input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="flex-grow-1">
              <Label>Senha</Label>
              <Input type="text" value={senha} onChange={e => setSenha(e.target.value)} />
            </div>

            <Label>ENDEREÇO</Label>
            <div className="flex-grow-1">
              <Label>Cidade</Label>
              <Input type="text" value={cidade} onChange={e => setCidade(e.target.value)} />
            </div>
            <div className="flex-grow-1">
              <Label>Estado</Label>
              <Input type="text" value={estado} onChange={e => setEstado(e.target.value)} />
            </div>
            <div className="flex-grow-1">
              <Label>Rua</Label>
              <Input type="text" value={rua} onChange={e => setRua(e.target.value)} />
            </div>
            <div className="flex-grow-1">
              <Label>Nº da Casa</Label>
              <Input type="number" value={nCasa} onChange={e => setNCasa(e.target.value)} />
            </div>
          </div>

          <div className="mt-3">
            <Submit value="Voltar" onClick={() => navigate('/alunos')} />
            <Submit value="Cadastrar" onClick={sen
*/