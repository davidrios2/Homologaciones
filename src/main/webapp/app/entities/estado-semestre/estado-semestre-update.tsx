import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEstadoSemestre } from 'app/shared/model/estado-semestre.model';
import { getEntity, updateEntity, createEntity, reset } from './estado-semestre.reducer';

export const EstadoSemestreUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const estadoSemestreEntity = useAppSelector(state => state.estadoSemestre.entity);
  const loading = useAppSelector(state => state.estadoSemestre.loading);
  const updating = useAppSelector(state => state.estadoSemestre.updating);
  const updateSuccess = useAppSelector(state => state.estadoSemestre.updateSuccess);

  const handleClose = () => {
    navigate('/estado-semestre');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...estadoSemestreEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...estadoSemestreEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="lab32023App.estadoSemestre.home.createOrEditLabel" data-cy="EstadoSemestreCreateUpdateHeading">
            Create or edit a Estado Semestre
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="estado-semestre-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Id Estado Semestre"
                id="estado-semestre-idEstadoSemestre"
                name="idEstadoSemestre"
                data-cy="idEstadoSemestre"
                type="text"
              />
              <ValidatedField
                label="State Semestre"
                id="estado-semestre-stateSemestre"
                name="stateSemestre"
                data-cy="stateSemestre"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/estado-semestre" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default EstadoSemestreUpdate;
