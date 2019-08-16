import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addSmurf, getSmurfs, deleteSmurf } from '../actions';
import './App.css';

import FormikSmurfForm from './SmurfForm';

const App = props => {
  useEffect(() => {
    if (props.smurfs.length === 0) {
      props.getSmurfs();
    }
  }, [props.smurfs]);

  return (
    <div className="App">
      <h1>SMURFS! 2.0 W/ Redux</h1>
      {props.isEditing ? (
        <FormikSmurfForm updateSmurf={props.updateSmurf} />
      ) : (
        <FormikSmurfForm addSmurf={props.addSmurf} />
      )}
      {props.smurfs.map(smurf => {
        return (
          <div key={smurf.id} className="smurf-card">
            <p>Name: {smurf.name}</p>
            <p>Age: {smurf.age}</p>
            <p>Height: {smurf.height}</p>
            <p>Id: {smurf.id}</p>
            <div>
              <button>Update</button>
              <button onClick={() => props.deleteSmurf(smurf.id)}>
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    smurfs: state.smurfs,
    error: state.error,
    isLoading: state.isLoading,
    isEditing: state.isEditing,
  };
};

export default connect(
  mapStateToProps,
  { addSmurf, getSmurfs, deleteSmurf },
)(App);