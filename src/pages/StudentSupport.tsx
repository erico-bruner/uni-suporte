import styled from "styled-components";
import Header from "../components/Header";
import { SUBJECTS } from "../data/subjects";
import { SUPPORTS } from "../data/supports";
import { MYSUPPORTS } from "../data/mySupports";
import { STUDENTS } from "../data/students";
import CreateSubjectModal from "../components/CreateSubjectModal";
import { useEffect, useState } from "react";
import { REQUESTS } from "../data/requests";
import RefuseSupportModal from "../components/Modals/RefuseSupportModal";
import CancelSupportModal from "../components/Modals/CancelSupportModal";
import { Link } from "react-router-dom";

export default function StudentSupport() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [refuseSupportModalIsOpen, setRefuseSupportModalIsOpen] =
    useState(false);
  const [cancelSupportModalIsOpen, setCancelSupportModalIsOpen] =
    useState(false);
  const [supports, setSupports] = useState<any>([]);
  const [supportRequests, setSupportRequests] = useState<any>([]);
  const [requests, setRequests] = useState<any>([]);
  const [approvedSupports, setApprovedSupports] = useState<any>([]);
  const [supportId, setSupportId] = useState<number>();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const refuseSupportModalCloseModal = () => {
    setRefuseSupportModalIsOpen(false);
  };

  const refuseSupportModalOpenModal = (id: number) => {
    setSupportId(id);
    setRefuseSupportModalIsOpen(true);
  };

  const cancelSupportModalCloseModal = () => {
    setCancelSupportModalIsOpen(false);
  };

  const cancelSupportModalOpenModal = (id: number) => {
    setSupportId(id);
    setCancelSupportModalIsOpen(true);
  };

  const deleteSupport = (id: number) => {
    SUPPORTS.splice(id, 1);

    const filterSubjects = SUPPORTS.filter(
      (support) => support.studentId === 1
    );

    const supports = filterSubjects.map((support) => {
      const subject = SUBJECTS.find(
        (subject) => subject.id === support.subjectId
      );

      if (support.studentId == 1) {
        return {
          ...support,
          subject,
        };
      }
    });

    setSupports(supports);
  };

  const toggleSupportVisibility = (id: number) => {
    const updatedSupports = SUPPORTS.map((s) => {
      if (s.id === id) {
        return { ...s, visible: !s.visible };
      }
      return s;
    });

    SUPPORTS.length = 0;
    SUPPORTS.push(...updatedSupports);

    const filterSubjects = SUPPORTS.filter(
      (support) => support.studentId === 1
    );

    const supports = filterSubjects.map((support) => {
      const subject = SUBJECTS.find(
        (subject) => subject.id === support.subjectId
      );

      if (support.studentId == 1) {
        return {
          ...support,
          subject,
        };
      }
    });

    setSupports(supports);
  };

  const acceptSupportRequest = (id: number) => {
    const updatedSupportRequest = MYSUPPORTS.map((s) => {
      if (s.id === id) {
        return { ...s, status: "approved" };
      }
      return s;
    });

    MYSUPPORTS.length = 0;
    MYSUPPORTS.push(...updatedSupportRequest);
  };

  useEffect(() => {
    const filterSubjects = SUPPORTS.filter(
      (support) => support.studentId === 1
    );
    const supports = filterSubjects.map((support) => {
      const subject = SUBJECTS.find(
        (subject) => subject.id === support.subjectId
      );

      if (support.studentId == 1) {
        return {
          ...support,
          subject,
        };
      }
    });
    setSupports(supports);

    const filterSupports = MYSUPPORTS.filter(
      (support) => support.studentSuportId === 1 && support.status === "pending"
    );
    const supportRequests = filterSupports.map((support) => {
      const studentSuport = STUDENTS.find(
        (student) => student.id === support.studentSuportId
      );

      const student = STUDENTS.find(
        (student) => student.id === support.studentId
      );

      const subject = SUBJECTS.find(
        (subject) => subject.id === support.subjectId
      );

      return {
        ...support,
        student,
        studentSuport,
        subject,
      };
    });
    setSupportRequests(supportRequests);

    const filterRequests = REQUESTS.filter((r) => r.studentId === 1);
    const requests = filterRequests.map((request) => {
      const student = STUDENTS.find((s) => s.id === request.studentId);

      if (request.studentId == 1) {
        return {
          ...request,
          student,
        };
      }
    });
    setRequests(requests);

    const filterApprovedSupports = MYSUPPORTS.filter(
      (support) =>
        support.studentSuportId === 1 && support.status === "approved"
    );
    const approvedSupports = filterApprovedSupports.map((support) => {
      const studentSuport = STUDENTS.find(
        (student) => student.id === support.studentSuportId
      );

      const student = STUDENTS.find(
        (student) => student.id === support.studentId
      );

      const subject = SUBJECTS.find(
        (subject) => subject.id === support.subjectId
      );

      return {
        ...support,
        student,
        studentSuport,
        subject,
      };
    });
    setApprovedSupports(approvedSupports);
  }, [modalIsOpen, refuseSupportModalIsOpen, acceptSupportRequest]);

  return (
    <>
      <Header />
      <SCContainer>
        <div>
          <button onClick={() => openModal()}>Adicionar Matéria</button>
          <h1>Matérias</h1>
          {supports.length != 0 || requests.length != 0 ? (
            <SCCardList>
              {requests.map((request: any) => {
                console.log(request);
                return (
                  <SCSubjectCard key={request?.id}>
                    <strong>Suporte:</strong>
                    <h1>{request?.subject?.name}</h1>
                    <p>Em validação</p>
                  </SCSubjectCard>
                );
              })}
              {supports.map((subject: any) => {
                return (
                  <SCSubjectCard
                    key={subject?.id}
                    className={subject.visible ? "" : "hidden"}
                  >
                    <strong>Suporte:</strong>
                    <h1>{subject?.subject?.name}</h1>
                    <div>
                      <button onClick={() => deleteSupport(subject?.id)}>
                        Excluir
                      </button>
                      <button
                        onClick={() => toggleSupportVisibility(subject?.id)}
                      >
                        {subject?.visible ? "Ocultar" : "Desocultar"}
                      </button>
                    </div>
                  </SCSubjectCard>
                );
              })}
            </SCCardList>
          ) : (
            <strong>Você ainda não cadastrou nenhuma matéria!</strong>
          )}
        </div>
        <div>
          <button>Solicitações</button>
          <h1>Solicitações</h1>
          {supportRequests.length != 0 ? (
            <SCCardList>
              {supportRequests.map((support: any) => {
                return (
                  <SCRequestCard key={support.id}>
                    <strong>Suporte:</strong>
                    <h1>{support.subject?.name}</h1>
                    <div>
                      <div>
                        <strong>Data:</strong>
                        <h2>{support.date}</h2>
                      </div>
                      <div>
                        <strong>Horário:</strong>
                        <h2>{support.time}</h2>
                      </div>
                    </div>
                    <div>
                      <strong>Descrição:</strong>
                      <p>{support.intention}</p>
                    </div>
                    <SCButtonGroup>
                      <button onClick={() => acceptSupportRequest(support?.id)}>
                        Aceitar
                      </button>
                      <button
                        onClick={() => refuseSupportModalOpenModal(support?.id)}
                      >
                        Recusar
                      </button>
                    </SCButtonGroup>
                  </SCRequestCard>
                );
              })}
            </SCCardList>
          ) : (
            <strong>Não há nenhuma solicitação!</strong>
          )}
        </div>
        <div>
          <SCWarningBox>
            <strong>CUIDADO:</strong> Não esqueça de gravar a aula pela
            plataforma escolhida para eventuais problemas com o feedback do
            aluno aprendiz.
          </SCWarningBox>
          <h1>Aulas Agendadas</h1>
          {approvedSupports.length != 0 ? (
            <SCCardList>
              {approvedSupports.map((support: any) => {
                return (
                  <SCRequestCard key={support.id}>
                    <strong>Suporte:</strong>
                    <h1>{support.subject?.name}</h1>
                    <div>
                      <div>
                        <strong>Data:</strong>
                        <h2>{support.date}</h2>
                      </div>
                      <div>
                        <strong>Horário:</strong>
                        <h2>{support.time}</h2>
                      </div>
                    </div>
                    <div>
                      <div>
                        <strong>Aluno Aprendiz:</strong>
                        <h2>
                          <Link to={`/profile/${support.student?.id}`}>
                            {support.student?.name}
                          </Link>
                        </h2>
                      </div>
                      <div>
                        <p>
                          <strong>Descrição:</strong> {support.intention}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <h2>
                          <a
                            href={"https://meet.google.com/smt-ptox-hme"}
                            target="_blank"
                          >
                            Clique aqui para acessar a aula
                          </a>
                        </h2>
                      </div>
                    </div>
                    <SCButtonGroup>
                      <button
                        onClick={() => cancelSupportModalOpenModal(support.id)}
                      >
                        Cancelar
                      </button>
                      <div />
                    </SCButtonGroup>
                  </SCRequestCard>
                );
              })}
            </SCCardList>
          ) : (
            <strong>Não há nenhuma aula agendada!</strong>
          )}
        </div>
      </SCContainer>
      <CreateSubjectModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        studentId={1}
      />
      <RefuseSupportModal
        isOpen={refuseSupportModalIsOpen}
        closeModal={refuseSupportModalCloseModal}
        supportId={supportId}
      />
      <CancelSupportModal
        isOpen={cancelSupportModalIsOpen}
        closeModal={cancelSupportModalCloseModal}
        supportId={supportId}
      />
    </>
  );
}

const SCContainer = styled.div`
  width: 100%;
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 150px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;

    > strong {
      color: #292929;
      font-family: Roboto;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      margin-top: 30px;
    }

    > button {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 4px;
      background: #27658c;
      color: #fff;
      font-family: Roboto;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      cursor: pointer;
    }

    > h1 {
      margin-top: 30px;
      color: #292929;
      font-family: Roboto;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
    }
  }
`;

const SCCardList = styled.div`
  display: flex;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 50px;
  gap: 10px;
  flex-direction: column;
`;

const SCSubjectCard = styled.div`
  width: 250px;
  height: auto;
  background: #f8f6f8;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 14px;
  padding-bottom: 14px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  &.hidden {
    background: #b6b6b6;
  }

  > p {
    margin-top: 30px;
    color: #ff3740;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;

    > strong {
      color: #292929;
      font-family: Roboto;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
    }
  }

  > strong {
    color: #292929;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }

  > h1 {
    margin-top: 10px;
    color: #000;
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
  }

  > div {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 13px;

    > button {
      margin-top: 20px;
      width: 100%;
      height: 40px;
      color: #27658c;
      font-family: Roboto;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      background: #f8f6f8;
      border-radius: 4px;
      border: 1px solid #27658c;
      cursor: pointer;
    }
  }
`;

const SCRequestCard = styled.div`
  width: 250px;
  height: auto;
  background: #f8f6f8;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 14px;
  padding-bottom: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  > strong {
    color: #292929;
    font-family: Roboto;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 5px;
  }

  > h1 {
    margin-top: 10px;
    color: #000;
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
  }

  > div {
    margin-top: 15px;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    width: 100%;
    gap: 5px;
    margin-bottom: 5px;

    > strong {
      color: #292929;
      font-family: Roboto;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
    }

    p {
      color: #292929;
      font-family: Roboto;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
    }

    > div {
      display: flex;
      flex-direction: row;
      gap: 5px;

      > strong {
        color: #292929;
        font-family: Roboto;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
      }

      > h2 {
        color: #292929;
        font-family: Roboto;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
      }
    }
  }
`;

const SCButtonGroup = styled.p`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 13px;

  > button {
    margin-top: 20px;
    width: 100%;
    height: 40px;
    color: #27658c;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    background: none;
    border-radius: 4px;
    border: 1px solid #27658c;
    cursor: pointer;
  }

  > div {
    width: 100%;
  }
`;

const SCWarningBox = styled.div`
  width: 100%;
  height: auto;
  padding: 10px;
  background: #f8f6f8;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  color: #292929;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  > strong {
    color: #292929;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
