import React from 'react'
import { Query } from 'react-apollo'

export const WrapperQuery = (query,variables) => child => (
    <Query query={query} variables={variables}>
      {({ loading, error, data, refetch }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return child(data, refetch)
      }}
    </Query>
)

export default {
  WrapperQuery,
}
