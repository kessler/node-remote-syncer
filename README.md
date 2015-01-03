# remote syncer
sync two folders initially and then unidirectionally overwrite files from a remote source to local target.

I use this mainly to sync files from my mac to my windows virtual box vm. In some scenarios you can't work right off the network mapped drive (like when dealing with services and elevation). So I need an up to date copy on the local vm drive, synced from the network mapped drive, which is mapped to the dev folder in my osx host...

index.js is running on the vm while client.js is running on the host machine.

when index.js fires up it does an initial sync between the network drive and the local drive copy, after which it starts listening on a port for overwrite commands that the client sends from the host.