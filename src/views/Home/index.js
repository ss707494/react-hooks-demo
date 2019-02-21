import React, { useState, useEffect } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export default () => {
  return (
      <Query query={gql`
        {
          allUser {
            name
            id
          }
        }
      `}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return data.allUser.map(({ name, id }) => (
              <div key={id}>
                <p>{id}: {name}</p>
              </div>
          ));
        }}
      </Query>
  )
}
