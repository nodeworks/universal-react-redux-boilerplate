import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt } from 'graphql'

const ImageType = new GraphQLObjectType({
  name: 'ImageType',
  fields: {
    id: {
      type: GraphQLID,
      resolve: function(image) {
        return image.fid;
      }
    },
    uuid: {
      type: GraphQLString,
      resolve: function(image) {
        return image.uuid;
      }
    },
    uri: {
      type: GraphQLString,
      resolve: function(image) {
        return image.uri;
      }
    },
    filename: {
      type: GraphQLString,
      resolve: function(image) {
        return image.filename;
      }
    },
    filesize: {
      type: GraphQLInt,
      resolve: function(image) {
        return image.filesize;
      }
    },
    status: {
      type: GraphQLBoolean,
      resolve: function(image) {
        return image.status;
      }
    },
    created: {
      type: GraphQLString,
      resolve: function(image) {
        return image.created;
      }
    },
    changed: {
      type: GraphQLString,
      resolve: function(image) {
        return image.changed;
      }
    }
  }
})

export default ImageType
