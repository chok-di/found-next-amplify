import { Request, Response } from 'express'
import jwt, { JwtHeader } from 'jsonwebtoken'
import jwksClient, { SigningKey } from 'jwks-rsa'

const cognitoPoolId = 'us-east-2_wDrBX8O9a'
const jwksUrl = `https://cognito-idp.us-east-2.amazonaws.com/${cognitoPoolId}/.well-known/jwks.json`
const client = jwksClient({ jwksUri: jwksUrl })

export const handler = async (req: Request, res: Response): Promise<void> => {
  const authHeader: string | undefined = req.headers.authorization
  if (authHeader) {
    try {
      const token: string = authHeader.split(' ')[1]
      const header: JwtHeader = jwt.decode(token, { complete: true })
        ?.header as JwtHeader
      client.getSigningKey(header.kid, (err, key: SigningKey | undefined) => {
        if (err) {
          res.status(500).json({ error: 'Error getting signing key' })
          return
        }
        const signingKey = key!.getPublicKey()
        jwt.verify(
          token,
          signingKey,
          { algorithms: ['RS256'] },
          (err, decoded) => {
            if (err) {
              res.status(401).json({ error: 'Invalid token' })
              return
            }
            res.status(200).json({ decoded })
          }
        )
      })
    } catch (err) {
      res.status(401).json({ error: 'No token provided' })
    }
  } else {
    res.status(401).json({ error: 'No token provided' })
  }
}

export default handler
