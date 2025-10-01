import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import DataTable from '../../components/datatable';
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function HomeAluno() {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    function fetchData() {
        setLoad(true);
        Client.get('alunos')
            .then(res => {
                const alunos = res.data.data.map(a => ({
                    ...a,
                    curso_nome: a.curso?.nome || '—'
                }));
                setData(alunos);
            })
            .catch(console.error)
            .finally(() => setLoad(false));
    }

    function verifyPermission() {
        if(!dataUser) navigate('/login');
        else if(permissions.listAluno === 0) navigate(-1);
    }

    useEffect(() => {
        verifyPermission();
        fetchData();
    }, []);


    function removeAluno(aluno) {

        const alunoId = aluno.id || aluno.aluno_id;
        Client.delete(`alunos/${alunoId}`)
            .then(() => {
                setData(prevData => prevData.filter(a => (a.id || a.aluno_id) !== alunoId));
            })
            .catch(err => {
                console.error(err);
            });
            
    }

    return (
        <>
            <NavigationBar />
            {load 
                ? <Container className="d-flex justify-content-center mt-5">
                    <OrbitProgress variant="spokes" color="#32cd32" size="medium" />
                  </Container>
                : <Container className='mt-2'>
                    <DataTable 
                        title="Alunos Registrados" 
                        rows={['Nome', 'Curso', 'Ações']}
                        hide={[false, false, false]}
                        data={data}       
                        setData={setData} 
                        keys={['nome', 'curso_nome']} 
                        resource='alunos'
                        crud={['viewAluno', 'createAluno', 'editAluno', 'deleteAluno']}
                        remove={removeAluno} // <-- passa a função
                    />
                  </Container>
            }
        </>
    )
}
