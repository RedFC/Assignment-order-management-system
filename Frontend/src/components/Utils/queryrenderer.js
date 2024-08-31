import { useCubeQuery } from '@cubejs-client/react';
import PropTypes from 'prop-types'; // You can use PropTypes for runtime type checking

// Define the QueryRenderer component
export function QueryRenderer({ query, children }) {
    const { resultSet, isLoading, error, refetch } = useCubeQuery(query || {}, {
        skip: !query,
        resetResultSetOnChange: true,
    });

    return children ? children({ resultSet, isLoading, error, refetch }) : null;
}

// Define prop types for runtime type checking
QueryRenderer.propTypes = {
    query: PropTypes.object,
    children: PropTypes.func
};
